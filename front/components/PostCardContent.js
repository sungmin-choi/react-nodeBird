import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostCardContent = ({postData}) => {
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((tag,index)=>{
                if(tag.match(/#[^\s#]+/)){
                    return <Link key={index} href={`/hashtag/${tag.slice(1)}`}><a>{tag}</a></Link>
                }
                return tag
            })}
            
        </div>
    )
}

PostCardContent.propTypes = {
    postData:PropTypes.string.isRequired,
}

export default PostCardContent
