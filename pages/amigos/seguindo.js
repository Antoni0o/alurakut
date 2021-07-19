import React from 'react'
import Link from 'next/link'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../../src/components/MainGrid'
import { ProfileSidebar } from '../index'
import { EditedRelationshipBoxWrapper } from '../../src/components/Relationship'
import { AlurakutMenu } from '../../src/lib/AlurakutCommons'

export default function Page(props) {
    const githubUser = props.githubUser
    const [following, setFollowing] = React.useState([])
    React.useEffect(function () {
        fetch(`https://api.github.com/users/${githubUser}/following`)
            .then((serverResponse) => {
                return serverResponse.json()
            })
            .then((completeResponse) => {
                setFollowing(completeResponse)
            })
    }, [])

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />

            <MainGrid>
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>
                <div style={{ gridArea: 'welcomeArea' }}>
                    <EditedRelationshipBoxWrapper style={{ height: '92vh' }}>
                        <h2 className="smallTitle">Seguindo ({following.length})</h2>

                        <ul>
                            {following.map((following) => {
                                return (
                                    <li key={following.id}>
                                        <Link href={`../usuario/${following.login}`}>
                                            <a>
                                                <img src={`https://github.com/${following.login}.png`} />
                                                <span>{following.login}</span>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                    </EditedRelationshipBoxWrapper >
                </div>
            </MainGrid>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = nookies.get(context)
    const token = cookies.USER_TOKEN
    const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
        headers: {
            Authorization: token
        }
    })
        .then((response) => response.json())

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const { githubUser } = jwt.decode(token);
    return {
        props: {
            githubUser
        }
    }
}