import React from 'react'
import { useRouteError } from 'react-router-dom'

export const ErrorPage = () => {

 const error:any = useRouteError();

 console.log(error);

  return (
    <div>
        <h1>Oops!</h1>
        <div>Sorry there was an error!</div>
        <div>{`${error.status} ${error.statusText}`}</div>
    </div>
  )
}
