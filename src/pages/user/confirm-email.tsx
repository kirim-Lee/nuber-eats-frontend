import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  verifyEmailMutation,
  verifyEmailMutationVariables,
} from '../../__generated__/verifyEmailMutation';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailMutation($code: String!) {
    verifyEmail(code: $code) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const location = useLocation();
  const [verifyEmail, { data, loading, error }] = useMutation<
    verifyEmailMutation,
    verifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION);

  useEffect(() => {
    // get query code
    const queries = location.search
      .replace('?', '')
      .split('&')
      .map((query) => query.split('='));

    const code = queries.find(([key]) => key === 'code')?.[1] ?? '';

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