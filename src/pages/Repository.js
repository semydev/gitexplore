import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import api from '../api/api';

import logoImg from '../assets/logo.svg';

const Repository = () => {
    const [repository, setRepository] = useState(null);
    const [issues, setIssues] = useState([]);

    const { params } = useRouteMatch();

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data);
        });
    
        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        });
    }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="GitHub Explorer" />

                <Link to="/">
                    <FiChevronLeft size={16} />
                    Back
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />

                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}.</p>
                        </div>
                    </header>

                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>

                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>

                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Open Issues</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issue => (
                <a
                    key={issue.id}
                    href={issue.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user.login}</p>
                    </div>

                    <FiChevronRight size={20} color="#cbcbcd" />
                </a>
                ))}
            </Issues>
        </>
    )
}

export default Repository

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a8a8b3;
        text-decoration: none;
        transition: 0.2s;
        &:hover {
            color: #666;
        }
        svg {
            margin-right: 4px;
        }
    }
`;

const RepositoryInfo = styled.section`
    margin-top: 80px;
    header {
        display: flex;
        align-items: center;
        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
        }
        div {
            margin-left: 24px;
            strong {
                color: #3d3d4d;
                font-size: 36px;
            }
            p {
                margin-top: 4px;
                color: #737388;
                font-size: 18px;
            }
        }
    }

    ul {
        display: flex;
        margin-top: 40px;
        list-style: none;
        li {
            & + li {
                margin-left: 80px;
            }
            strong {
                display: block;
                color: #3d3d4d;
                font-size: 36px;
            }
            span {
                display: block;
                margin-top: 4px;
                color: #6c6c80;
            }
        }
    }
`;

const Issues = styled.div`
    margin-top: 80px;
    a {
        display: block;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 24px;
        border-radius: 5px;
        background: #fff;
        text-decoration: none;
        transition: transform 0.2s;
        & + a {
            margin-top: 16px;
        }
        &:hover {
            transform: translateX(10px);
        }
    }
    div {
        flex: 1;
        margin: 0 16px;
        strong {
            color: #3d3d4d;
            font-size: 20px;
        }
        p {
            margin-top: 4px;
            color: #a8a8b3;
            font-size: 18px;
        }
        svg {
            margin-left: auto;
        }
    }
`;