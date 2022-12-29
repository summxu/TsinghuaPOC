export type GenericConfig = unknown;
export type ModelFields = unknown;

export type GenericSearchResultItem<T> = { data: T, allow_record_tags: string[] }

export type ConditionLeafType = { field?: string, comparator?: string, value?: string | string[] | number }

export type ConditionType = {
  logic_operator?: string,
  leaf?: ConditionLeafType,
  parent?: ConditionType,
  children?: Array<ConditionType>,
}
