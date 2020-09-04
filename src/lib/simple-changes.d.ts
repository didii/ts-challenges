// Lifted from '@angular/core'

/**
 * A hashtable of changes represented by {@link SimpleChange} objects stored
 * at the declared property name they belong to on a Directive or Component. This is
 * the type passed to the `ngOnChanges` hook.
 *
 * @see `OnChanges`
 *
 * @publicApi
 */
export declare interface SimpleChanges {
  [propName: string]: SimpleChange;
}
