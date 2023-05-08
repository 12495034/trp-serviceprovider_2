import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { spinnerType } from '../constants/general';
import { spinnerColor } from '../constants/general';

/**
 * Spinner Icon component, renders standard spinner when performing background operations
 * @returns Spiiner Icon based on default values set in general.js file
 */

export default function SpinnerIcon() {
  return (
    <Spinner animation={spinnerType} variant={spinnerColor} />
  )
}
