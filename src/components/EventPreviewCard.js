import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Link } from 'gatsby'

const EventContainer = styled.div`
  margin-top: 20px;
`
const LearnMore = styled.div`
  font-size: 14px;
`
const EventTitle = styled.h4`
  margin-top: 10px;
 `
 const FromNow = styled.span`
  color: #a0a0a0;
  font-weight: 400;
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
  let {
    description,
    local_date,
    local_time,
    link,
    name,
    meetup_group,
    display_name,
  } = props.meetup

  description = parseDescription(description)
  let dateMomentObj = moment(`${local_date} ${local_time}`, 'YYYY-MM-DD HH:mm')

  let fullDateString = dateMomentObj.format('dddd, MMMM Do, YYYY')
  let timeFromNow = dateMomentObj.fromNow()
 
  return (
    <EventContainer>
      <strong>
        <time>{fullDateString}</time>{' '}
        <FromNow>({timeFromNow})</FromNow>
      </strong>
      <EventTitle>
        <a href={link}>{name}</a>
      </EventTitle>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </blockquote>
      {meetup_group && display_name && (
        <LearnMore>
          <Link to={`/groups/${meetup_group}/`}>
            Learn more about {display_name}
          </Link>
        </LearnMore>
      )}
      {props.idx !== props.numMeetups - 1 && <hr />}
    </EventContainer>
  )
}

export default EventPreviewCard
