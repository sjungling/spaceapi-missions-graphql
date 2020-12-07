import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type NotFound = {
  __typename?: 'NotFound';
  message: Scalars['String'];
};

export enum Media_Type_Enum {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

/** Image or Video from the internet */
export type Media = {
  __typename?: 'Media';
  /** Source URL */
  url: Scalars['String'];
  /** Copyright notice, etc. */
  attribution?: Maybe<Scalars['String']>;
  /** Denotes either a VIDEO or IMAGE */
  type: Media_Type_Enum;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  /** Fetch all Astronauts from the Apollo space program */
  astronauts: Array<Maybe<Astronaut>>;
  astronaut: AstronautResult;
  /** Fetch all Apollo space program missions */
  missions?: Maybe<Array<Maybe<Mission>>>;
  mission: MissionResult;
};


export type QueryAstronautArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryMissionArgs = {
  id: Scalars['Int'];
};

export type AstronautResult = Astronaut | NotFound;

export type Astronaut = {
  __typename?: 'Astronaut';
  /** ID is an auto-incrementing value from data store */
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type MissionResult = Mission | NotFound;

export type Mission = {
  __typename?: 'Mission';
  id: Scalars['ID'];
  /**
   * Commonly associated with the name.
   * 
   * **Example:** `Apollo 11`
   */
  mission?: Maybe<Scalars['String']>;
  /**
   * Launch Date of mission includeing UTC timestamp
   * 
   * **Example:** `10/11/1968 15:02:00`
   */
  launchDate: Scalars['DateTime'];
  astronauts?: Maybe<Array<Maybe<Astronaut>>>;
  /** Mapped from cm_name */
  commandModule?: Maybe<Scalars['String']>;
  /** Mapped from lm_name */
  lunarModule?: Maybe<Scalars['String']>;
  launchVehicle: Scalars['String'];
  /** Mapped from remarks */
  notes?: Maybe<Scalars['String']>;
  /** Duration of the mission in seconds */
  duration?: Maybe<Scalars['Int']>;
  media?: Maybe<Array<Maybe<Media>>>;
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  NotFound: ResolverTypeWrapper<NotFound>;
  String: ResolverTypeWrapper<Scalars['String']>;
  MEDIA_TYPE_ENUM: Media_Type_Enum;
  Media: ResolverTypeWrapper<Media>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AstronautResult: ResolversTypes['Astronaut'] | ResolversTypes['NotFound'];
  Astronaut: ResolverTypeWrapper<Astronaut>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  MissionResult: ResolversTypes['Mission'] | ResolversTypes['NotFound'];
  Mission: ResolverTypeWrapper<Mission>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  NotFound: NotFound;
  String: Scalars['String'];
  Media: Media;
  Query: {};
  Int: Scalars['Int'];
  AstronautResult: ResolversParentTypes['Astronaut'] | ResolversParentTypes['NotFound'];
  Astronaut: Astronaut;
  ID: Scalars['ID'];
  MissionResult: ResolversParentTypes['Mission'] | ResolversParentTypes['NotFound'];
  Mission: Mission;
  DateTime: Scalars['DateTime'];
  Boolean: Scalars['Boolean'];
};

export type NotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotFound'] = ResolversParentTypes['NotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  attribution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MEDIA_TYPE_ENUM'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  astronauts?: Resolver<Array<Maybe<ResolversTypes['Astronaut']>>, ParentType, ContextType>;
  astronaut?: Resolver<ResolversTypes['AstronautResult'], ParentType, ContextType, RequireFields<QueryAstronautArgs, never>>;
  missions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mission']>>>, ParentType, ContextType>;
  mission?: Resolver<ResolversTypes['MissionResult'], ParentType, ContextType, RequireFields<QueryMissionArgs, 'id'>>;
};

export type AstronautResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AstronautResult'] = ResolversParentTypes['AstronautResult']> = {
  __resolveType: TypeResolveFn<'Astronaut' | 'NotFound', ParentType, ContextType>;
};

export type AstronautResolvers<ContextType = any, ParentType extends ResolversParentTypes['Astronaut'] = ResolversParentTypes['Astronaut']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MissionResult'] = ResolversParentTypes['MissionResult']> = {
  __resolveType: TypeResolveFn<'Mission' | 'NotFound', ParentType, ContextType>;
};

export type MissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mission'] = ResolversParentTypes['Mission']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  launchDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  astronauts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Astronaut']>>>, ParentType, ContextType>;
  commandModule?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lunarModule?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  launchVehicle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['Media']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type Resolvers<ContextType = any> = {
  NotFound?: NotFoundResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  AstronautResult?: AstronautResultResolvers<ContextType>;
  Astronaut?: AstronautResolvers<ContextType>;
  MissionResult?: MissionResultResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
