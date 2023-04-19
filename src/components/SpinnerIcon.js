import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { spinnerType } from '../constants/general';
import { spinnerColor } from '../constants/general';

export default function SpinnerIcon() {
  return (
    <Spinner animation={spinnerType} variant={spinnerColor} />
  )
}
