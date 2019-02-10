import { TemplateRef } from '@angular/core';

import { PblTableSorter } from '../../data-source/types';
import { PblTableColumnDef } from '../directives';
import { deepPathGet, deepPathSet } from '../utils';
import { PblColumnSizeInfo } from '../types';
import { PblTableMetaCellContext, PblTableCellContext } from '../context/types';
import { PblColumnDefinition, PblColumnTypeDefinition } from './types';
import { initDefinitions, parseStyleWidth } from './utils';
import { PblColumnGroup, PblColumnGroupStore } from './group-column';

const PBL_ANGRID_COLUMN_MARK = Symbol('PblColumn');
const CLONE_PROPERTIES: Array<keyof PblColumn> = ['sort', 'headerType', 'footerType', 'pin'];

export function isPblColumn(def: any): def is PblColumn {
  return def instanceof PblColumn || def[PBL_ANGRID_COLUMN_MARK] === true;
}

export class PblColumn implements PblColumnDefinition {
  id: string;
  label?: string;

  /**
   * CSS class that get applied on the header and cell.
   * You can apply unique header/cell styles using the element name.
   */
  css?: string;

  /**
   * The width in px or % in the following format: ##% or ##px
   * Examples: '50%', '50px'
   */
  get width(): string { return this._width; }
  set width(value: string) {
    if (value !== this._width) {
      this._parsedWidth = parseStyleWidth(this._width = value);
      const isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
      Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth });
    }
  }
  /**
   * This minimum width in pixels
   * This is an absolute value, thus a number.
   */
  minWidth?: number;
  /**
   * This maximum width in pixels
   * This is an absolute value, thus a number.
   */
  maxWidth?: number;

  /**
   * A place to store things...
   * This must be an object, values are shadow-copied so persist data between multiple plugins.
   */
  data: any = {};

  get parsedWidth(): { value: number; type: 'px' | '%' } | undefined { return this._parsedWidth; }

  /**
   * The property to display (from the row element)
   * You can use dot notation to display deep paths.
   */
  prop: string;

  /**
   * A path to a nested object, relative to the row element.
   * The table will display `prop` from the object referenced by `path`.
   *
   * You can also use dot notation directly from `prop`.
   *
   * Example:
   * prop: "street"
   * path: [ "myInstance", "user", "address"
   *
   * is identical to:
   * prop: "myInstance.user.address.street"
   *
   */
  path?: string[];

  /**
   * The type of the values in this column.
   * This is an additional level for matching columns to templates, grouping templates for a type.
   */
  type?: PblColumnTypeDefinition;
  headerType?: PblColumnTypeDefinition;
  footerType?: PblColumnTypeDefinition;

  sort?: boolean | PblTableSorter;

  /**
   * Marks the table as editable. An editable column also requires an edit template to qualify as editable, this flag alone is not enough.
   *
   * Note that this flag only effect the CSS class added to the cell.
   */
  editable: boolean;

  pin: 'start' | 'end' | undefined;

  /**
   * The original value of `prop`.
   * @internal
   */
  orgProp: string;

  /**
   * Used by pbl-table to apply custom cell template, or the default when not set.
   * @internal
   */
  cellTpl: TemplateRef<PblTableCellContext<any>>;
    /**
   * Used by pbl-table to apply custom cell template, or the default when not set.
   * @internal
   */
  editorTpl: TemplateRef<PblTableCellContext<any>>;
  /**
   * Used by pbl-table to apply a custom header cell template, or the default when not set.
   * @internal
   */
  headerCellTpl: TemplateRef<PblTableMetaCellContext<any>>;
  /**
   * Used by pbl-table to apply a custom footer cell template, or the default when not set.
   * @internal
   */
  footerCellTpl: TemplateRef<PblTableMetaCellContext<any>>;

  /**
   * Used by the library as a logical flag representing the column hidden state.
   * This flag does not effect the UI, changing it will not change he hidden state in the UI.
   * Do not set this value manually.
   * @internal
   */
  hidden: boolean;

  /**
   * When true indicates that the width is set with type pixels.
   * @internal
   */
  readonly isFixedWidth?: boolean;

  /**
   * An on-demand size info object, populated by `PblColumnSizeObserver`
   * @internal
   */
  sizeInfo?: PblColumnSizeInfo;

  /** @internal */
  maxWidthLock: boolean;

  /**
   * The column def for this column.
   */
  get columnDef(): PblTableColumnDef<PblColumn> { return this._columnDef; }

  get groups(): string[] { return Array.from(this._groups.values()); }

  /** @internal */
  public readonly groupStore: PblColumnGroupStore;

  private _width?: string;
  private _parsedWidth: ReturnType<typeof parseStyleWidth>;

  private _columnDef: PblTableColumnDef<PblColumn>;
  private defaultWidth = '';

  /**
   * Groups that this column belongs to.
   * WARNING: DO NOT ADD/REMOVE GROUPS DIRECTLY, USE markInGroup/markNotInGroup.
   */
  private _groups = new Set<string>();

  constructor(def: PblColumn, groupStore?: PblColumnGroupStore);
  constructor(def: PblColumnDefinition, groupStore: PblColumnGroupStore);
  constructor(def: PblColumn | PblColumnDefinition, groupStore?: PblColumnGroupStore) {
    this[PBL_ANGRID_COLUMN_MARK] = true;

    if (isPblColumn(def)) {
      initDefinitions(def, this);
      this.prop = def.prop;
      this.path = def.path;
      this.orgProp = def.orgProp;
      this.groupStore = groupStore || def.groupStore;
      this._groups = new Set<string>(def._groups);
      for (const id of Array.from(def._groups.values())) {
        const g = this.groupStore.find(id);
        if (g) {
          this.markInGroup(g);
          g.replace(this);
        }
      }
    } else {
      const path = def.path || def.prop.split('.');
      const prop = def.path ? def.prop : path.pop();

      def = Object.create(def);
      def.id = def.id || def.prop || def.label;
      def.label = 'label' in def ? def.label : prop;

      if (typeof def.type === 'string') {
        def.type = { name: def.type } as any;
      }
      if (typeof def.headerType === 'string') {
        def.headerType = { name: def.headerType } as any;
      }
      if (typeof def.footerType === 'string') {
        def.footerType = { name: def.footerType } as any;
      }

      initDefinitions(def, this);

      this.groupStore = groupStore;
      this.prop = prop;
      this.orgProp = def.prop;
      if (path.length) {
        this.path = path;
      }
    }

    for (const prop of CLONE_PROPERTIES) {
      if (prop in def) {
        this[prop as any] = def[prop]
      }
    }
  }

  static extendProperty(name: keyof PblColumn): void {
    if (CLONE_PROPERTIES.indexOf(name) === -1) {
      CLONE_PROPERTIES.push(name);
    }
  }

  attach(columnDef: PblTableColumnDef<PblColumn>): void {
    this.detach();
    this._columnDef = columnDef;
    if (this.defaultWidth) {
      this.columnDef.updateWidth(this.width || this.defaultWidth);
    }
  }

  detach(): void {
    this._columnDef = undefined;
  }

  setDefaultWidth(defaultWidth: string): void {
    this.defaultWidth = defaultWidth;
  }

  updateWidth(markForCheck: boolean, width?: string): void {
    if (width) {
      this.width = width;
    }
    const { columnDef } = this;
    if (columnDef) {
      columnDef.updateWidth(this.width || this.defaultWidth || '');
      if (markForCheck) {
        columnDef.markForCheck();
      }
    }
  }

  /**
   * Get the value this column points to in the provided row
   */
  getValue<T = any>(row: any): T {
    return deepPathGet(row, this);
  }

  /**
   * Set a value in the provided row where this column points to
   */
  setValue(row: any, value: any): void {
    return deepPathSet(row, this, value);
  }

  /**
   * Mark's that this column belong to the provided group.
   * \> Note that this internal to the column and does not effect the group in any way.
   */
  markInGroup(g: PblColumnGroup): void {
    this.groupStore.attach(g, this);
    this._groups.add(g.id);
  }

  /**
   * Mark's that this column does not belong to the provided group.
   * \> Note that this internal to the column and does not effect the group in any way.
   */
  markNotInGroup(g: PblColumnGroup): boolean {
    this.groupStore.detach(g, this);
    return this._groups.delete(g.id);
  }

  isInGroup(g: PblColumnGroup): boolean {
    return this._groups.has(g.id);
  }

  getGroupOfRow(rowIndex: number): PblColumnGroup | undefined {
    const groupIds = this.groups;
    for (const id of groupIds) {
      const g = this.groupStore.find(id);
      if (g && g.rowIndex === rowIndex) {
        return g;
      }
    }
  }

  groupLogic(columnGroups: [PblColumnGroup, PblColumnGroup, PblColumnGroup], groupExists: boolean): PblColumnGroup {
    const [gPrev, gCurr, gNext] = columnGroups;

    // STATE: This column has same group of previous column, nothing to do.
    if (gCurr === gPrev) {
      return gCurr;
    }

    // STATE: The group exists in one of the columns BUT NOT in the last column (a slave split)
    if (groupExists) {
      // If the previous sibling group is a slave and this group is the origin of the slave, convert this group to the slave.
      if (gPrev && gCurr === gPrev.slaveOf) {
        return gPrev;
      }
      if (gNext && gCurr === gNext.slaveOf) {
        return gNext;
      }
      // Otherwise create the slave.
      const g = gCurr.createSlave([this]);
      this.groupStore.add(g);

      // If the current group is a placeholder and either the previous OR next sibling group is a placeholder as well
      // we want to group them together, although they are not related, because they both have identical headers (empty header).
      // Note that we still create the salve, we just don't use it.
      if (gCurr.placeholder) {
        const groupWithPlaceholder = gPrev && gPrev.placeholder ? gPrev : gNext && gNext.placeholder ? gNext : undefined;
        if (groupWithPlaceholder) {
          return groupWithPlaceholder;
        }
      }

      return g;
    }
    // STATE: The group IS a slave and it is set AFTER an item that belongs to the group it is slave of.
    else if (gCurr.slaveOf && gCurr.slaveOf === gPrev) {
      return gCurr.slaveOf;
    }
    // STATE: The group IS a slave and it is set BEFORE an item that belongs to the group it is slave of.
    else if (gCurr.slaveOf && gCurr.slaveOf === gNext) {
      return gCurr.slaveOf;
    }
    return gCurr;
  }

  /**
   * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
   * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
   * and return true.
   * Otherwise return false.
   * @internal
   */
  checkMaxWidthLock(actualWidth: number): boolean {
    if (actualWidth === this.maxWidth) {
      if (!this.maxWidthLock) {
        this.maxWidthLock = true;
        return true;
      }
    } else if (this.maxWidthLock) {
      this.maxWidthLock = false;
      return true;
    }
    return false;
  }

}
