import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/congiureStore';
const App = ({Component}) => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <meta charSet="utf-8" />
            </Head>
            <Component/>
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);
