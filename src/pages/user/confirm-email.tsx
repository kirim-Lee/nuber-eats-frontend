import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  verifyEmailMutation,
  verifyEmailMutationVariables,
} from '../../__generated__/verifyEmailMutation';
import { useMe } from '../../hooks/useMe';
import { getSearch } from '../../util';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailMutation($code: String!) {
    verifyEmail(code: $code) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const location = useLocation();
  const history = useHistory();

  const onCompleted = (data: verifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push('/');
    }
  };

  const [verifyEmail, { data }] = useMutation<
    verifyEmailMutation,
    verifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, { onCompleted });

  useEffect(() => {
    // get query code
    const code = getSearch(location.search, 'code');

    // if code then call api verify email
    if (code) {
      verifyEmail({ variables: { code } });
    }
  }, [location.search, verifyEmail]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      {data?.verifyEmail ? (
        data?.verifyEmail?.error ? (
          <h4 className="text-gray-700 text-sm">{data.verifyEmail.error}</h4>
        ) : (
          <h4 className="text-gray-700 text-sm">success verified!</h4>
        )
      ) : (
        <>
          <h2 className="text-lg mb-2 font-medium">Confirming email...</h2>
          <h4 className="text-gray-700 text-sm">
            Please wait, don't close this page...
          </h4>
        </>
      )}
    </div>
  );
};
