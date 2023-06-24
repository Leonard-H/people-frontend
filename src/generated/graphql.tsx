import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};


export type ChangePasswordResponse = {
   __typename?: 'ChangePasswordResponse',
  success: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  logout: Scalars['Boolean'],
  revokeRefreshTokensForUser: Scalars['Boolean'],
  login: LoginResponse,
  register: Scalars['Boolean'],
  deleteUser: Array<User>,
  changePassword: ChangePasswordResponse,
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  userType: Scalars['Float'],
  password: Scalars['String'],
  familyId: Scalars['String'],
  familyName: Scalars['String'],
  firstName: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String']
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']
};


export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String'],
  newPassword: Scalars['String']
};

export type Person = {
   __typename?: 'Person',
  id: Scalars['String'],
  name: Scalars['String'],
  firstNames?: Maybe<Scalars['String']>,
  familyName?: Maybe<Scalars['String']>,
  religion?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  bornOn?: Maybe<Scalars['String']>,
  bornIn?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  descendantNotes?: Maybe<Scalars['String']>,
  bornFamilyName?: Maybe<Scalars['String']>,
  parents: Array<Person>,
  descendants: Array<Person>,
  diedOn?: Maybe<Scalars['String']>,
  diedIn?: Maybe<Scalars['String']>,
  age: Scalars['String'],
  livedIn: Array<Scalars['String']>,
  jobs?: Maybe<Array<Scalars['String']>>,
  familyStatus?: Maybe<Scalars['String']>,
  sources?: Maybe<Array<Scalars['String']>>,
  sbId?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  marriages: Array<PersonMarriage>,
};

export type PersonMarriage = {
   __typename?: 'PersonMarriage',
  id: Scalars['String'],
  person?: Maybe<Person>,
  date?: Maybe<Scalars['String']>,
  place?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  users: Array<User>,
  me?: Maybe<User>,
  people: Array<Person>,
  person: Person,
  mePerson: Person,
  birthdayPeople: Array<Person>,
  marriagePeople: Array<Person>,
};


export type QueryPeopleArgs = {
  name?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryPersonArgs = {
  id: Scalars['String']
};


export type QueryBirthdayPeopleArgs = {
  birthday?: Maybe<Scalars['String']>
};


export type QueryMarriagePeopleArgs = {
  marriageDate?: Maybe<Scalars['String']>
};

export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
  firstName: Scalars['String'],
  familyName: Scalars['String'],
  familyId: Scalars['String'],
  prefersDarkMode: Scalars['Boolean'],
  userType: Scalars['String'],
};
export type PeopleQueryVariables = {
  name?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>
};


export type PeopleQuery = (
  { __typename?: 'Query' }
  & { people: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'name' | 'id' | 'bornOn' | 'firstNames' | 'familyName' | 'age'>
  )> }
);

export type PersonQueryVariables = {
  id: Scalars['String']
};


export type PersonQuery = (
  { __typename?: 'Query' }
  & { person: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name' | 'firstNames' | 'familyName' | 'bornOn' | 'bornIn' | 'livedIn' | 'jobs' | 'familyStatus' | 'sources' | 'sbId' | 'status' | 'diedOn' | 'diedIn' | 'title' | 'notes' | 'descendantNotes' | 'bornFamilyName'>
    & { parents: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name'>
      & { descendants: Array<(
        { __typename?: 'Person' }
        & Pick<Person, 'id' | 'name'>
      )> }
    )>, descendants: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name'>
    )>, marriages: Array<(
      { __typename?: 'PersonMarriage' }
      & { person: Maybe<(
        { __typename?: 'Person' }
        & Pick<Person, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type MePersonQueryVariables = {};


export type MePersonQuery = (
  { __typename?: 'Query' }
  & { mePerson: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name'>
    & { parents: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name'>
      & { descendants: Array<(
        { __typename?: 'Person' }
        & Pick<Person, 'id' | 'name'>
      )> }
    )>, descendants: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name'>
    )>, marriages: Array<(
      { __typename?: 'PersonMarriage' }
      & { person: Maybe<(
        { __typename?: 'Person' }
        & Pick<Person, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type BirthdayPeopleQueryVariables = {
  birthday?: Maybe<Scalars['String']>
};


export type BirthdayPeopleQuery = (
  { __typename?: 'Query' }
  & { birthdayPeople: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name' | 'bornOn'>
  )> }
);

export type MarriagePeopleQueryVariables = {
  marriageDate?: Maybe<Scalars['String']>
};


export type MarriagePeopleQuery = (
  { __typename?: 'Query' }
  & { marriagePeople: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name'>
    & { marriages: Array<(
      { __typename?: 'PersonMarriage' }
      & { person: Maybe<(
        { __typename?: 'Person' }
        & Pick<Person, 'id'>
      )> }
    )> }
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'firstName' | 'familyName' | 'familyId' | 'userType'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'firstName' | 'familyName' | 'familyId' | 'prefersDarkMode' | 'userType'>
    ) }
  ) }
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  username: Scalars['String'],
  firstName: Scalars['String'],
  familyName: Scalars['String'],
  familyId: Scalars['String'],
  password: Scalars['String'],
  userType: Scalars['Float']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'firstName' | 'familyName' | 'familyId' | 'prefersDarkMode' | 'userType'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type DeleteUserMutationVariables = {
  id: Scalars['String']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'firstName' | 'familyName' | 'familyId' | 'userType'>
  )> }
);

export type ChangePasswordMutationVariables = {
  newPassword: Scalars['String'],
  oldPassword: Scalars['String']
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'ChangePasswordResponse' }
    & Pick<ChangePasswordResponse, 'success' | 'error'>
  ) }
);

export const PeopleDocument = gql`
    query People($name: String, $limit: Int) {
  people(name: $name, limit: $limit) {
    name
    id
    bornOn
    firstNames
    familyName
    age
  }
}
    `;

    export function usePeopleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
      return ApolloReactHooks.useQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, baseOptions);
    }
      export function usePeopleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, baseOptions);
      }
      
export type PeopleQueryHookResult = ReturnType<typeof usePeopleQuery>;
export type PeopleQueryResult = ApolloReactCommon.QueryResult<PeopleQuery, PeopleQueryVariables>;
export const PersonDocument = gql`
    query Person($id: String!) {
  person(id: $id) {
    id
    name
    firstNames
    familyName
    bornOn
    bornIn
    livedIn
    jobs
    familyStatus
    sources
    sbId
    status
    diedOn
    diedIn
    title
    notes
    descendantNotes
    bornFamilyName
    parents {
      id
      name
      descendants {
        id
        name
      }
    }
    descendants {
      id
      name
    }
    marriages {
      person {
        id
        name
      }
    }
  }
}
    `;

    export function usePersonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonQuery, PersonQueryVariables>) {
      return ApolloReactHooks.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, baseOptions);
    }
      export function usePersonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, baseOptions);
      }
      
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonQueryResult = ApolloReactCommon.QueryResult<PersonQuery, PersonQueryVariables>;
export const MePersonDocument = gql`
    query mePerson {
  mePerson {
    id
    name
    parents {
      id
      name
      descendants {
        id
        name
      }
    }
    descendants {
      id
      name
    }
    marriages {
      person {
        id
        name
      }
    }
  }
}
    `;

    export function useMePersonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MePersonQuery, MePersonQueryVariables>) {
      return ApolloReactHooks.useQuery<MePersonQuery, MePersonQueryVariables>(MePersonDocument, baseOptions);
    }
      export function useMePersonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MePersonQuery, MePersonQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MePersonQuery, MePersonQueryVariables>(MePersonDocument, baseOptions);
      }
      
export type MePersonQueryHookResult = ReturnType<typeof useMePersonQuery>;
export type MePersonQueryResult = ApolloReactCommon.QueryResult<MePersonQuery, MePersonQueryVariables>;
export const BirthdayPeopleDocument = gql`
    query BirthdayPeople($birthday: String) {
  birthdayPeople(birthday: $birthday) {
    id
    name
    bornOn
  }
}
    `;

    export function useBirthdayPeopleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BirthdayPeopleQuery, BirthdayPeopleQueryVariables>) {
      return ApolloReactHooks.useQuery<BirthdayPeopleQuery, BirthdayPeopleQueryVariables>(BirthdayPeopleDocument, baseOptions);
    }
      export function useBirthdayPeopleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BirthdayPeopleQuery, BirthdayPeopleQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<BirthdayPeopleQuery, BirthdayPeopleQueryVariables>(BirthdayPeopleDocument, baseOptions);
      }
      
export type BirthdayPeopleQueryHookResult = ReturnType<typeof useBirthdayPeopleQuery>;
export type BirthdayPeopleQueryResult = ApolloReactCommon.QueryResult<BirthdayPeopleQuery, BirthdayPeopleQueryVariables>;
export const MarriagePeopleDocument = gql`
    query MarriagePeople($marriageDate: String) {
  marriagePeople(marriageDate: $marriageDate) {
    id
    name
    marriages {
      person {
        id
      }
    }
  }
}
    `;

    export function useMarriagePeopleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MarriagePeopleQuery, MarriagePeopleQueryVariables>) {
      return ApolloReactHooks.useQuery<MarriagePeopleQuery, MarriagePeopleQueryVariables>(MarriagePeopleDocument, baseOptions);
    }
      export function useMarriagePeopleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MarriagePeopleQuery, MarriagePeopleQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MarriagePeopleQuery, MarriagePeopleQueryVariables>(MarriagePeopleDocument, baseOptions);
      }
      
export type MarriagePeopleQueryHookResult = ReturnType<typeof useMarriagePeopleQuery>;
export type MarriagePeopleQueryResult = ApolloReactCommon.QueryResult<MarriagePeopleQuery, MarriagePeopleQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    username
    firstName
    familyName
    familyId
    userType
  }
}
    `;

    export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
      return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
    }
      export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
      
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      username
      firstName
      familyName
      familyId
      prefersDarkMode
      userType
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $firstName: String!, $familyName: String!, $familyId: String!, $password: String!, $userType: Float!) {
  register(email: $email, username: $username, firstName: $firstName, familyName: $familyName, familyId: $familyId, password: $password, userType: $userType)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

    export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
      return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
    }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    firstName
    familyName
    familyId
    prefersDarkMode
    userType
  }
}
    `;

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

    export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
      return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
    }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    id
    email
    username
    firstName
    familyName
    familyId
    userType
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

    export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
    }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
  changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
    success
    error
  }
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

    export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
      return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
    }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;