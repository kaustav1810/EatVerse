import React from 'react'
import { useRouteError } from 'react-router-dom'

// Type for router error response
interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export const ErrorPage = () => {

 const error = useRouteError() as RouteError;

  return (
    <div>
        <h1>Oops!</h1>
        <div>Sorry there was an error!</div>
        <div>{`${error?.status || ''} ${error?.statusText || ''}`}</div>
    </div>
  )
}
