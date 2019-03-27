import { graphql } from 'gatsby'

export const EventLinkDataFragment = graphql`
  fragment EventLinkData on SyrEvent {
    id
    name
    local_date(formatString: "MMMM DD, YYYY")
    link
  }
`
