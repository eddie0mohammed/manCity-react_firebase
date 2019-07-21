import React from 'react'


const matches_block = (props) => {
    const {match} = props;
    return (
        <div className="match_block">
            <div className="match_date">
                {match.final === 'Yes' ? match.date : `Date: ${match.date}`}
            </div>

            <div className="match_wrapper">
                <div className="match_top">
                    <div className="left">
                        <div className="icon" style={{backgroundImage:`url(${require(`../../images/team_icons/${match.localThmb}.png`)}`}}></div>
                        <div className="team_name">{match.local}</div>
                    </div>
                    <div className="right">
                        {match.final === 'Yes' ? match.resultLocal : '-'}
                    </div>
                </div>
                <div className="match_bottom">
                    <div className="left">
                        <div className="icon" style={{backgroundImage:`url(${require(`../../images/team_icons/${match.awayThmb}.png`)}`}}></div>
                        <div className="team_name">{match.away}</div>
                    </div>
                    <div className="right">
                        {match.final === 'Yes' ? match.resultAway : '-'}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default matches_block
