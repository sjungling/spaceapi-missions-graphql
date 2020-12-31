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
  _FieldSet: any;
  DateTime: any;
};






export type Astronaut = {
  __typename?: 'Astronaut';
  firstName: Scalars['String'];
  /** ID is an auto-incrementing value from data store */
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** Missions flown by astronaut */
  missions: Array<Maybe<Mission>>;
};

export type AstronautResult = Astronaut | NotFound;


export type Mission = {
  __typename?: 'Mission';
  /** Crew members aboard the mission */
  astronauts: Array<Astronaut>;
  /** Mapped from cm_name */
  commandModule: Scalars['String'];
  /** Duration of the mission in seconds */
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /**
   * Launch Date of mission including UTC timestamp
   * **Example:** `10/11/1968 15:02:00`
   */
  launchDate: Scalars['DateTime'];
  launchVehicle: Scalars['String'];
  /** Mapped from lm_name */
  lunarModule: Scalars['String'];
  /**
   * Commonly associated with the name.
   * **Example:** `Apollo 11`
   */
  mission: Scalars['String'];
  /** Mapped from remarks */
  notes?: Maybe<Scalars['String']>;
  status: Mission_Status_Enum;
};

export enum Mission_Status_Enum {
  Aborted = 'ABORTED',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export type MissionResult = Mission | NotFound;

export type NotFound = {
  __typename?: 'NotFound';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Find an Astronaut by their ID
   * May return a `NotFound`
   */
  astronaut: AstronautResult;
  /** Fetch all Astronauts from the Apollo space program */
  astronauts: Array<Maybe<Astronaut>>;
  hello?: Maybe<Scalars['String']>;
  mission: MissionResult;
  /** Fetch all Apollo space program missions */
  missions?: Maybe<Array<Maybe<Mission>>>;
};


export type QueryAstronautArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryMissionArgs = {
  id: Scalars['Int'];
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
  Astronaut: ResolverTypeWrapper<Astronaut>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  AstronautResult: ResolversTypes['Astronaut'] | ResolversTypes['NotFound'];
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mission: ResolverTypeWrapper<Mission>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MISSION_STATUS_ENUM: Mission_Status_Enum;
  MissionResult: ResolversTypes['Mission'] | ResolversTypes['NotFound'];
  NotFound: ResolverTypeWrapper<NotFound>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Astronaut: Astronaut;
  String: Scalars['String'];
  ID: Scalars['ID'];
  AstronautResult: ResolversParentTypes['Astronaut'] | ResolversParentTypes['NotFound'];
  DateTime: Scalars['DateTime'];
  Mission: Mission;
  Int: Scalars['Int'];
  MissionResult: ResolversParentTypes['Mission'] | ResolversParentTypes['NotFound'];
  NotFound: NotFound;
  Query: {};
  Boolean: Scalars['Boolean'];
};

export type AstronautResolvers<ContextType = any, ParentType extends ResolversParentTypes['Astronaut'] = ResolversParentTypes['Astronaut']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  missions?: Resolver<Array<Maybe<ResolversTypes['Mission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AstronautResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AstronautResult'] = ResolversParentTypes['AstronautResult']> = {
  __resolveType: TypeResolveFn<'Astronaut' | 'NotFound', ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mission'] = ResolversParentTypes['Mission']> = {
  astronauts?: Resolver<Array<ResolversTypes['Astronaut']>, ParentType, ContextType>;
  commandModule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  launchDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  launchVehicle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lunarModule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mission?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MISSION_STATUS_ENUM'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MissionResult'] = ResolversParentTypes['MissionResult']> = {
  __resolveType: TypeResolveFn<'Mission' | 'NotFound', ParentType, ContextType>;
};

export type NotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotFound'] = ResolversParentTypes['NotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  astronaut?: Resolver<ResolversTypes['AstronautResult'], ParentType, ContextType, RequireFields<QueryAstronautArgs, never>>;
  astronauts?: Resolver<Array<Maybe<ResolversTypes['Astronaut']>>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mission?: Resolver<ResolversTypes['MissionResult'], ParentType, ContextType, RequireFields<QueryMissionArgs, 'id'>>;
  missions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mission']>>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Astronaut?: AstronautResolvers<ContextType>;
  AstronautResult?: AstronautResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mission?: MissionResolvers<ContextType>;
  MissionResult?: MissionResultResolvers<ContextType>;
  NotFound?: NotFoundResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
