import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Link } from 'gatsby'

const EventContainer = styled.div`
  margin-top: 20px;

  a {
    color: #008aff;
    text-decoration: none;
  }

  blockquote {
    border-left: 5px solid #eee;
    padding-left: 26px;
    margin-left: 0;
    color: #808080;
    font-style: italic;
  }
`

/**
 * Parse out first paragraph of event description
 * @param {string} desc - html string recieved from Meetup API
 */
function parseDescription(desc) {
  // If desc is not html, pass it through
  if (desc[0] !== '<') return desc

  let findStr = "What we'll do<br/>"

  let idx = desc.indexOf(findStr)

  if (idx === -1) {
    findStr = '<p>'
    idx = desc.indexOf(findStr)
  }

  let idxEnd = desc.indexOf('</p>', idx)

  return desc.slice(idx + findStr.length, idxEnd)
}

function EventPreviewCard(props) {
  let { description, local_date, link, name, meetup_group } = props.meetup

  description = parseDescription(description)
  let dateMomentObj = moment(local_date)

  let fullDateString = dateMomentObj.format('dddd, MMMM Do, YYYY')
  let timeFromNow = dateMomentObj.fromNow()

  return (
    <EventContainer>
      <strong>
        <time>{fullDateString}</time>{' '}
        <span style={{ color: '#646464', fontWeight: '500' }}>
          ({timeFromNow})
        </span>
      </strong>
      <h4 style={{ marginTop: 0 }}>
        <a href={link}>{name}</a>
      </h4>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </blockquote>
      {meetup_group && (
        <Link to={`/groups/${meetup_group}/`}>
          Learn more about this Meetup...
        </Link>
      )}
      {props.idx !== props.numMeetups - 1 && <hr />}
    </EventContainer>
  )
}

export default EventPreviewCard
