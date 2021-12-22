import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
const App = ({Component}) => {
    return (
        <div>
            <Head>
                <title>NodeBird</title>
                <meta charSet="utf-8" />
            </Head>
            <Component/>
        </div>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default App
