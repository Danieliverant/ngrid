import { ConnectableObservable, Observable, ReplaySubject, from, of, race, timer } from 'rxjs';
import { concatMap, first, publishReplay, switchMap } from 'rxjs/operators';

import { Injectable, NgZone } from '@angular/core';
import { ContentMapService } from '../content-map.service';
import { SearchWebWorkerMessage, SearchResults } from './models';

class WorkerSearchAdapter {

  private worker: Worker;
  private nextId = 0;

  constructor(private zone: NgZone, private contentMapping: ContentMapService) {
    this.worker = new Worker('./search.worker', { name: 'searchWorker', type: 'module' });
  }


  loadIndex(): Observable<boolean> {
    return from(this.contentMapping.getMapping)
      .pipe(
        switchMap( ({ searchContent }) => this.sendMessage<boolean>('loadIndex', searchContent) )
      );
  };
  queryIndex(query: string): Observable<SearchResults> {
    return this.sendMessage<SearchResults>('queryIndex', query);
  }

  dispose(): void { }

  private sendMessage<T>(type: SearchWebWorkerMessage['type'], payload?: any): Observable<T> {

    return new Observable<T>( subscriber => {

      const id = this.nextId++;

      const handleMessage = (response: MessageEvent) => {
        const {type: responseType, id: responseId, payload: responsePayload} = response.data as SearchWebWorkerMessage;
        if (type === responseType && id === responseId) {
          this.zone.run(() => {
            subscriber.next(responsePayload);
            subscriber.complete();
          });
        }
      };

      const handleError = (error: ErrorEvent) => {
        // Since we do not check type and id any error from the webworker will kill all subscribers
        this.zone.run(() => subscriber.error(error));
      };

      // Wire up the event listeners for this message
      this.worker.addEventListener('message', handleMessage);
      this.worker.addEventListener('error', handleError);

      // Post the message to the web worker
      this.worker.postMessage({type, id, payload});

      // At completion/error unwire the event listeners
      return () => {
        this.worker.removeEventListener('message', handleMessage);
        this.worker.removeEventListener('error', handleError);
      };
    });
  }
}

class WindowSearchAdapter {
  private searchEngine: import('./search-engine').SearchEngine;

  constructor(private contentMapping: ContentMapService) { }

  loadIndex(): Observable<boolean> {
    const p = Promise.all([ import('./search-engine'), this.contentMapping.getMapping ])
      .then( ([searchEngine, contentMapping]) => {
        this.searchEngine = new searchEngine.SearchEngine(contentMapping.searchContent);
        return this.searchEngine.loadIndex();
      });
    return from(p);
  };

  queryIndex(query: string): Observable<SearchResults> { return of({ query, results: this.searchEngine.queryIndex(query) }); }

  dispose(): void { }
}

class WindowNoopSearchAdapter {

  loadIndex(): Observable<boolean> {
    return of(true);
  };

  queryIndex(query: string): Observable<SearchResults> {
    return of({ query, results: [] });
  }

  dispose(): void { }
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  ready: Observable<boolean>;

  readonly hasWorker: boolean;

  private searchesSubject = new ReplaySubject<string>(1);
  private adapter: WorkerSearchAdapter | WindowSearchAdapter | WindowNoopSearchAdapter;

  constructor(ngZone: NgZone, contentMapping: ContentMapService) {
    this.hasWorker = typeof Worker !== 'undefined';

    if (this.hasWorker) {
      this.adapter = new WorkerSearchAdapter(ngZone, contentMapping);
    } else {
      this.adapter = new WindowNoopSearchAdapter(); // new WindowSearchAdapter();
    }
  }

  loadIndex(initDelay: number = 2000): Observable<boolean> {
    const ready = this.ready = race<any>(
      timer(initDelay),
      this.searchesSubject.asObservable().pipe(first()),
    )
    .pipe(
      concatMap(() => this.adapter.loadIndex() ),
      publishReplay(1),
    );

    // Connect to the observable to kick off the timer
    (ready as ConnectableObservable<boolean>).connect();
    return this.ready;
  };

  queryIndex(query: string): Observable<SearchResults> {
     // Trigger the searches subject to override the init delay timer
    this.searchesSubject.next(query);
    return this.ready.pipe(concatMap(() => this.adapter.queryIndex(query) ));
  }

  dispose(): void { this.adapter.dispose(); }
}
