import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyLink = styled(Link)`
    background-color: teal;
    color: #eee;
    margin: 10px;
    padding: 10px;
    text-decoration: none;
    border-radius: 8px;

    &:hover {
        color: teal;
        background-color: #eee;
    }
`

const navStyle = {
    display: 'flex',
    flexWrap: 'wrap'
}

export const Menubar = () => {
    return (
        <nav style={navStyle}>
            <MyLink to="/admin">AdminPage</MyLink>
        </nav>  
    )
}