import React from 'react';
import TranscodeFeature, { TranscodeUi } from './src/transcodeFeature';
import CompressionFeature, { CompressionUi } from './src/compressionFeature';

export type Feature = typeof TranscodeFeature | typeof CompressionFeature;

export type FeatureElement = {
  feature: Feature;
  description: string;
  ui: JSX.Element | string;
};

export type Features = {
  [name: string]: FeatureElement
};

const FEATURES: Features = {
  TRANSCODE: {
    feature: TranscodeFeature,
    description: 'Choose which format to convert your video to',
    ui: <TranscodeUi parents={['TRANSCODE']} />,
  },
  COMPRESS: {
    feature: CompressionFeature,
    description: 'Choose how much you want to compress your video',
    ui: <CompressionUi parents={['COMPRESS']} />,
  },
};

export default FEATURES;