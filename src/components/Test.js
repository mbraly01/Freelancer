import React from 'react'
import { PromiseProvider } from 'mongoose'

export default function Test(props) {

    return (
        <div>
            {props.cookies["id"]}
        </div>
    )
}