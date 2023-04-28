import { gql } from '@apollo/client';

export const QUERY_DATA_STRIPE = gql`
  query UserStripeQuery($userId: String) {
    users(where: { id: { _eq: $userId } }) {
      id
      stripeCustomerId
      stripeSetupSecret
      userOrganizations(order_by: { default: desc_nulls_last }) {
        organizationId
        role
        default
      }
    }
  }
`;
