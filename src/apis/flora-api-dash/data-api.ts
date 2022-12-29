import { Limiter } from "../utils/limiter";
import * as gql from '../utils/gql';
import * as defs from './query-defs';
import { ConditionType } from "./gql-common-types";

export type DataAPIArgs<V> = {
  vars: V,
  cacheMode?: gql.CacheMode,
};

function escapePercent(q: string) {
  return q.replace('%', '\\%');
}

export function buildSimpleSearchCondition(args: {
  query: string,
  fields: Array<{ field: string, match: 'equal' | 'substr' | 'prefix' | 'suffix' | 'like' }>,
  caseSensitive: boolean,
}): ConditionType {

  const likeOp = args.caseSensitive ? 'like' : 'ilike';
  return {
    logic_operator: '|',
    children: args.fields.map((f) => {
      let comparator = '=';
      let value = args.query;
      switch (f.match) {
        case 'equal':
          if (!args.caseSensitive) {
            comparator = 'ilike';
            value = escapePercent(args.query);
          }
          break;
        case 'substr':
          comparator = likeOp
          value = `%${escapePercent(args.query)}%`
          break;
        case 'prefix':
          comparator = likeOp
          value = `${escapePercent(args.query)}%`
          break;
        case 'suffix':
          comparator = likeOp
          value = `%${escapePercent(args.query)}`
          break;
        case 'like':
          comparator = likeOp
          break;
      }
      return {
        leaf: {
          field: f.field,
          comparator,
          value,
        }
      }
    }),
  }
}

export class DataAPI {
  constructor(public gqlClient: gql.GQLClient) { }

  public destroyCache = () => {
    this.gqlClient.gqlLoader?.clearAll();
  }

  #limit = new Limiter(1);

  #dataApiQueryWrapper = <Q extends gql.Query<any, any> = gql.Query<any, any>, V = gql.VariableType<any>>(args: {
    vars: V;
    queryDef: Q;
    cacheMode?: gql.CacheMode;
  }): Promise<gql.OKResult<gql.ResultType<Q>>> => {
    return new Promise<gql.OKResult<gql.ResultType<Q>>>((resolve, reject) => {
      args.queryDef.fetch({
        client: this.gqlClient,
        v: args.vars,
        cacheMode: args.cacheMode
      }).then((r) => {
        resolve(r);
      }).catch((r) => {
        reject(r);
      })
    }).catch(e => {
      console.log(`\n${e}\nStack:${new Error().stack}\n\n`)
      return e
    });
  }

  #dataApiMutationWrapper = <Q extends gql.Mutation<any, any> = gql.Mutation<any, any>, V = gql.VariableType<any>>(args: {
    vars: V;
    queryDef: Q;
  }): Promise<gql.OKResult<gql.ResultType<Q>>> => {
    const { vars, queryDef } = args
    this.destroyCache()

    return this.#limit.run(() => {
      return new Promise<gql.OKResult<gql.ResultType<Q>>>((resolve, reject) => {
        queryDef.run({
          v: vars,
          client: this.gqlClient
        }).then((r) => {
          resolve(r);
        }).catch((r) => {
          reject(r);
        })
      });
    }).catch(e => {
      console.log(`\n${e}\nStack:${new Error().stack}\n\n`)
      return e
    });
  }

  #wrapQuery = <T extends gql.Query<unknown, unknown>>(def: T) => {
    return (args: DataAPIArgs<gql.VariableType<T>>) => {
      return (this.#dataApiQueryWrapper({
        ...args,
        queryDef: def,
      }));
    }
  }

  #wrapMutation = <T extends gql.Mutation<unknown, unknown>>(def: T) => {
    return (args: DataAPIArgs<gql.VariableType<typeof def>>) => {
      return this.#dataApiMutationWrapper({
        ...args,
        queryDef: def,
      });
    }
  }

  save = this.#wrapMutation(defs._genericSave);
  unlink = this.#wrapMutation(defs._genericUnlink);
  callMethod = this.#wrapMutation(defs._genericCallMethod);
  updateRelation = this.#wrapMutation(defs._genericUpdateRelation);
  getByRawID = this.#wrapQuery(defs._genericGet);

  getByFloraExternalID = <RecordT>(args: DataAPIArgs<gql.VariableType<typeof defs._genericGetByFloraExternalID>>): Promise<gql.OKResult<defs.GenericGetResult<RecordT>>> => {
    return this.#dataApiQueryWrapper({
      ...args,
      queryDef: defs._genericGetByFloraExternalID,
    });
  }

  search = <RecordT>(args: DataAPIArgs<gql.VariableType<typeof defs._genericSearch>>): Promise<gql.OKResult<defs.GenericSearchResult<RecordT>>> => {
    return this.#dataApiQueryWrapper({
      ...args,
      queryDef: defs._genericSearch,
    });
  }

  pivottablesSearch = <RecordT>(args: DataAPIArgs<gql.VariableType<typeof defs._genericPivottablesSearch>>): Promise<gql.OKResult<defs.GenericPivottablesSearchResult<RecordT>>> => {
    return this.#dataApiQueryWrapper({
      ...args,
      queryDef: defs._genericPivottablesSearch,
    })
  }

  relationModelSearch = <RecordT>(args: DataAPIArgs<gql.VariableType<typeof defs._genericRelationModelSearch>>): Promise<gql.OKResult<defs.GenericSearchResult<RecordT>>> => {
    // todo: cacheKey 需要优化一些，因为这个接口实际上是获取reletionModel的数据
    return this.#dataApiQueryWrapper({
      ...args,
      queryDef: defs._genericRelationModelSearch,
    })
  }

  configByModel = this.#wrapQuery(defs._genericConfigByModel);
  fields = this.#wrapQuery(defs._genericFields);
  me = this.#wrapQuery(defs._genericMe);
  modelDisplayName = this.#wrapQuery(defs._genericModelDisplayName);
  getModelList = this.#wrapQuery(defs._genericGetModelList);
  modelUserReadOnly = this.#wrapQuery(defs._genericModelUserReadOnly);
  modelDefaults = this.#wrapQuery(defs._genericModelDefaults);
  allowRecordTags = this.#wrapQuery(defs._genericModelAllowRecordTags);
}
