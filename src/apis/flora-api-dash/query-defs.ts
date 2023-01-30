import { ModelFields, GenericConfig, ConditionType } from './gql-common-types';
import * as gql from '../utils/gql';
const { defineMutation, defineQuery, types } = gql;

export const _genericConfigByModel = gql.defineQuery({
  name: 'configByModel',
  v: {
    model: types.string,
    view_type: types.string,
  },
  q: gql.params({
    '$model': 'String!',
    '$view_type': 'String!',
  }, {
    dash: {
      generic: {
        config: gql.params({
          model: '$model',
          view_type: '$view_type',
        }, {
          items: [{
            raw: types.string,
          }],
          page_info: {
            total_count: types.number,
          },
        }),
      }
    }
  }),
}, (t) => {
  const formatRawData = (raw: any): GenericConfig => {
    const d = JSON.parse(raw || '{}') || {}
    if (!!d['data']) {
      return {
        ...d,
        data: JSON.parse(d['data'] || "{}")
      }
    }
    return d
  }
  const items: Array<{ raw: GenericConfig }> = (t?.dash?.generic?.config?.items || []).map(item => ({ raw: formatRawData(item.raw) }))

  return {
    items,
    page_info: t?.dash?.generic?.config?.page_info
  }
})

export const _genericGet = defineQuery({
  name: 'get',
  v: {
    model: types.string,
    id: types.number,
    fields: [types.string],
    match_record_tags: [types.string],
  },
  q: gql.params({
    '$model': 'String!',
    '$id': 'Int!',
    '$fields': '[String]',
    '$match_record_tags': '[String]',
  }, {
    dash: {
      generic: {
        get: gql.params({
          model: '$model',
          id: '$id',
          fields: '$fields',
          match_record_tags: '$match_record_tags',
        }, {
          raw: types.string,
          allow_record_tags: [types.string],
          relations: types.string,
        }),
      }
    }
  }),
}, (t) => {
  const raw = t?.dash?.generic?.get?.raw;
  return {
    data: raw && JSON.parse(raw) as Record<any, any> || undefined,
    relations: t?.dash?.generic?.get?.relations,
    allow_record_tags: t?.dash?.generic?.get?.allow_record_tags,
  };
})

export const _genericGetByFloraExternalID = defineQuery({
  name: 'get_by_flora_external_id',
  v: {
    model: types.string,
    flora_external_id: types.string,
    fields: [types.string],
    match_record_tags: gql.optional([types.string]),
  },
  q: gql.params({
    '$model': 'String!',
    '$flora_external_id': 'String!',
    '$fields': '[String]',
    '$match_record_tags': '[String]',
  }, {
    dash: {
      generic: {
        get_by_flora_external_id: gql.params({
          model: '$model',
          flora_external_id: '$flora_external_id',
          fields: '$fields',
          match_record_tags: '$match_record_tags',
        }, {
          raw: types.string,
          allow_record_tags: [types.string],
          relations: types.string,
        }),
      }
    }
  }),
}, (t) => {
  const raw = t?.dash?.generic?.get_by_flora_external_id?.raw;
  return {
    data: raw && JSON.parse(raw) || undefined,
    relations: t?.dash?.generic?.get_by_flora_external_id?.relations,
    allow_record_tags: t?.dash?.generic?.get_by_flora_external_id?.allow_record_tags,
  };
})

export type GenericGetResult<RecordT> = {
  data: RecordT | undefined;  // 如果不存在或者没有读取权限，会返回空值。
  relations: string;
  allow_record_tags: string[];
};;;

export const _genericSearch = defineQuery({
  name: 'search',
  v: {
    model: types.string,
    condition: gql.optional(types.custom<ConditionType>()),
    fields: [types.string],
    limit: types.number,
    offset: types.number,
    sort: gql.optional([{
      field: types.string,
      order: types.custom<'asc' | 'desc'>(),
    }]),
    match_record_tags: gql.optional([types.string]),
    apply_list_view_filter: types.optional.boolean,
    view_config_external_id: types.optional.string,
    custom_count_fields: types.optional.string,
  },
  q: gql.params({
    '$model': 'String!',
    '$condition': 'String',
    '$fields': '[String]',
    '$limit': 'Int',
    '$offset': 'Int',
    '$sort': 'String',
    '$apply_list_view_filter': 'Boolean',
    '$match_record_tags': '[String]',
    '$view_config_external_id': 'String',
    '$custom_count_fields': 'String',
  }, {
    dash: {
      generic: {
        search: gql.params({
          model: '$model',
          condition: '$condition',
          fields: '$fields',
          limit: '$limit',
          offset: '$offset',
          sort: '$sort',
          apply_list_view_filter: '$apply_list_view_filter',
          match_record_tags: '$match_record_tags',
          view_config_external_id: '$view_config_external_id',
          custom_count_fields: '$custom_count_fields',
        }, {
          items: [{
            raw: types.string,
            allow_record_tags: [types.string],
          }],
          relations: types.string,
          allow_record_tags: [types.string],
          page_info: {
            total_count: types.number,
            custom_count: types.string,
          },
        }),
      }
    }
  }),
}, (t) => {
  const r: GenericSearchResult<any> = {
    items: t?.dash?.generic?.search?.items?.map(item => ({
      data: item.raw && JSON.parse(item.raw || "{}") || undefined,
      allow_record_tags: item.allow_record_tags,
    })),
    page_info: t?.dash?.generic?.search?.page_info,
    relations: t?.dash?.generic?.search?.relations,
    allow_record_tags: t?.dash?.generic?.search?.allow_record_tags,
  };
  return r;
}, (v) => {
  const { sort, condition, fields, ...other } = v;
  return {
    ...other,
    fields,
    condition: condition && JSON.stringify(condition),
    sort: sort && JSON.stringify(sort),
  }
});

// 手写类型方便调用端使用。
export type GenericSearchResult<RecordT> = {
  items: {
    data: RecordT;
    allow_record_tags: string[];
  }[];
  page_info: {
    total_count: number;
    custom_count: string;
  };
  relations: string;
  allow_record_tags: string[];
}

export const _genericPivottablesSearch = defineQuery({
  name: 'pivottables_search',
  v: {
    pivottables_id: types.number,
    condition: types.optional.string,
    fields: [types.string],
    limit: types.number,
    offset: types.number,
    sort: types.optional.string,
    apply_list_view_filter: types.boolean,
  },
  q: gql.params({
    '$pivottables_id': 'Int!',
    '$condition': 'String',
    '$fields': '[String]',
    '$limit': 'Int',
    '$offset': 'Int',
    '$sort': 'String',
    '$apply_list_view_filter': 'Boolean',
  }, {
    dash: {
      generic: {
        pivottables_search: gql.params({
          pivottables_id: '$pivottables_id',
          condition: '$condition',
          fields: '$fields',
          limit: '$limit',
          offset: '$offset',
          sort: '$sort',
          apply_list_view_filter: '$apply_list_view_filter',
        }, {
          items: [{
            raw: types.custom<'ok' | 'error'>(),
          }],
          relations: types.string,
          page_info: {
            total_count: types.number,
          },
        }),
      }
    }
  }),
}, (t) => {
  return <GenericPivottablesSearchResult<any>>{
    items: t?.dash?.generic?.pivottables_search?.items?.map(item => ({
      data: JSON.parse(item.raw || "{}"),
    })),
    status: 'ok',
    page_info: t?.dash?.generic?.pivottables_search?.page_info,
    relations: t?.dash?.generic?.pivottables_search?.relations,
  }
})

// 手写类型方便调用端使用。
export type GenericPivottablesSearchResult<RecordT> = {
  items: {
    data: RecordT;
  }[];
  status: string;
  page_info: {
    total_count: number;
  };
  relations: string;
}


export const _genericGetModelList = defineQuery({
  name: 'getModelList',
  v: {},
  q: {
    dash: {
      generic: {
        get_model_list: [{
          display_name: types.string,
          name: types.string,
          description: types.string,
          user_read_only: types.boolean,
        }],
      }
    }
  }
}, t => t?.dash?.generic?.get_model_list)

export const _genericRelationModelSearch = gql.defineQuery({
  name: 'relationModelSearch',
  v: {
    current_model: types.string,
    current_id: types.number,
    current_relation_field: types.string,
    fields: [types.string],
    limit: types.number,
    offset: types.number,
    search_type: types.custom<"associated" | "not_associated" | "all">(),
    sort: types.optional.string,
    condition: types.optional.string,
    match_record_tags: gql.optional([types.string]),
    custom_count_fields: types.optional.string,
  },
  q: gql.params({
    '$current_model': 'String!',
    '$current_id': 'Int',
    '$current_relation_field': 'String!',
    '$fields': '[String]',
    '$limit': 'Int',
    '$offset': 'Int',
    '$sort': 'String',
    '$condition': 'String',
    '$search_type': 'String',
    '$match_record_tags': '[String]',
    '$custom_count_fields': 'String',
  }, {
    dash: {
      generic: {
        relation_model_search: gql.params({
          current_model: '$current_model',
          current_id: '$current_id',
          current_relation_field: '$current_relation_field',
          fields: '$fields',
          limit: '$limit',
          offset: '$offset',
          sort: '$sort',
          condition: '$condition',
          search_type: '$search_type',
          match_record_tags: '$match_record_tags',
          custom_count_fields: '$custom_count_fields',
        }, {
          items: [{
            raw: types.string,
            allow_record_tags: [types.string],
          }],
          relations: types.string,
          page_info: {
            total_count: types.number,
            custom_count: types.string,
          },
          allow_record_tags: [types.string],
        }),
      }
    }
  }),
}, (t) => (<GenericSearchResult<any>>{
  page_info: t?.dash?.generic?.relation_model_search?.page_info,
  items: (t?.dash?.generic?.relation_model_search?.items || []).map(i => ({
    data: JSON.parse(i.raw || '{}'),
    allow_record_tags: i.allow_record_tags,
  })),
  status: "ok",
  relations: t?.dash?.generic?.relation_model_search?.relations,
  allow_record_tags: t?.dash?.generic?.relation_model_search?.allow_record_tags,
}))

export const _genericFields = defineQuery({
  name: 'fields',
  v: {
    model: types.string,
    fields: types.custom<string[] | undefined>(),
  },
  q: gql.params({
    '$model': 'String!',
    '$fields': '[String]'
  }, {
    dash: {
      generic: {
        fields: gql.params({
          model: '$model',
          fields: '$fields'
        }, {
          raw: types.string,
        }),
      }
    }
  })
}, (t) => {
  const raw = JSON.parse(t?.dash?.generic?.fields?.raw || '{}')
  for (const key in raw) {
    if (raw.hasOwnProperty(key)) {
      const element = raw[key];
      if (!element?.selections?.length && element?.selection?.length) {
        const selections = element.selection.map((item: string[]) => {
          return {
            value: item[0],
            name: item[1],
          }
        })
        element.selections = selections;
      }
    }
  }
  const data = {
    raw: raw as ModelFields
  }
  return data
})


export const _genericModelDisplayName = defineQuery({
  name: 'modelDisplayName',
  v: {
    model: types.string
  },
  q: gql.params({
    '$model': 'String!',
  }, {
    dash: {
      generic: {
        info: gql.params({
          model: '$model',
        }, {
          display_name: types.string
        })
      }
    }
  })
}, t => t?.dash?.generic?.info?.display_name)

export const _genericModelDefaults = defineQuery({
  name: 'modelDefaults',
  v: {
    model: types.string
  },
  q: gql.params({
    '$model': 'String!',
  }, {
    dash: {
      generic: {
        get_defaults: gql.params({
          model: '$model',
        }, {
          raw: types.string
        })
      }
    }
  })
}, t => t?.dash?.generic?.get_defaults?.raw)

export const _genericSave = defineMutation({
  name: 'save',
  v: {
    model: types.string,
    values: types.custom<Record<string, any>>(),
  },
  q: gql.params({
    '$model': 'String!',
    '$values': 'String',
  }, {
    dash: {
      generic: {
        save: gql.params({
          model: '$model',
          values: '$values',
        }, {
          result: {
            id: types.string
          },
          error_msg: types.string,
          error_kind: types.string,
          error_sub_kind: types.string,
          sub_kind: types.string,
          status: types.string,
          errors: [
            {
              level: types.string,
              kind: types.string,
              message: types.string
            }
          ]
        }),
      }
    }
  }),
}, (t) => t.dash.generic.save, (v) => {
  const { values, ...other } = v;
  return {
    ...other,
    values: JSON.stringify(values),
  };
})

export const _genericUnlink = defineMutation({
  name: 'unlink',
  v: {
    model: types.string,
    id: types.number,
  },
  q: gql.params({
    '$model': 'String!',
    '$id': 'Int!',
  }, {
    dash: {
      generic: {
        unlink: gql.params({
          model: '$model',
          id: '$id',
        }, {
          status: types.string,
          error_msg: types.string
        })
      }
    }
  }),
}, (t) => t.dash.generic.unlink)

export const _genericCallMethod = defineMutation({
  name: 'callMethod',
  v: {
    model: types.string,
    id: types.number,
    arguments: types.string,
    method: types.string,
    condition: types.string,
  },
  q: gql.params({
    '$model': 'String!',
    '$id': 'Int!',
    '$arguments': 'String!',
    '$method': 'String!',
    "$condition": 'String'
  }, {
    dash: {
      generic: {
        call_method: gql.params({
          model: '$model',
          id: '$id',
          arguments: '$arguments',
          method: '$method',
          condition: '$condition',
        }, {
          status: types.string,
          error_msg: types.string,
          result: types.string,
        })
      }
    }
  })
}, (t) => t.dash.generic.call_method)

export const _genericUpdateRelation = defineMutation({
  name: 'updateRelation',
  v: {
    model: types.string,
    id: types.number,
    relation_field: types.string,
    relationIDs: [types.number],
    kind: types.custom<"add" | "unlink">(),
  },
  q: gql.params({
    '$model': 'String!',
    '$id': 'Int!',
    '$relation_field': 'String!',
    '$relationIDs': '[Int]',
    "$kind": 'String'
  }, {
    dash: {
      generic: {
        update_relation: gql.params({
          model: '$model',
          id: '$id',
          relation_field: '$relation_field',
          relationIDs: '$relationIDs',
          kind: '$kind'
        }, {
          status: types.string,
          error_msg: types.string
        })
      }
    }
  })
}, (t) => t.dash.generic.update_relation)

export const _genericModelUserReadOnly = defineQuery({
  name: 'modelUserReadOnly',
  v: {
    model: types.string
  },
  q: gql.params({
    '$model': 'String!',
  }, {
    dash: {
      generic: {
        info: gql.params({
          model: '$model',
        }, {
          user_read_only: types.boolean
        })
      }
    }
  })
}, t => t?.dash?.generic?.info?.user_read_only)

export const _genericModelAllowRecordTags = defineQuery({
  name: 'allowRecordTags',
  v: {
    model: types.string,
    is_create: types.boolean,
    match_record_tags: [types.string],
  },
  q: gql.params({
    '$model': 'String!',
    '$is_create': 'Boolean',
    '$match_record_tags': '[String]',
  }, {
    dash: {
      generic: {
        allow_record_tags: gql.params({
          model: '$model',
          is_create: '$is_create',
          match_record_tags: '$match_record_tags',
        }, [types.string])
      }
    }
  })
}, t => t?.dash?.generic?.allow_record_tags)

export const _genericMe = defineQuery({
  name: 'me',
  q: {
    user: {
      me: {
        name: types.string,
        email: types.string,
        uid: types.number,
        nickname: types.string,
        default_identity_id: types.number,
      }
    }
  }
}, (t) => t?.user?.me)
