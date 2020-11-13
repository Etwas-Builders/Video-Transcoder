import React, { useState, useEffect } from 'react'

import Steps, { Step } from 'rc-steps'

import 'rc-steps/assets/index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faFile,
  faClock,
  faDownload,
  faCogs
} from '@fortawesome/free-solid-svg-icons'

import { observer } from 'mobx-react'

import ComponentStore from '../../store/componentStore'

type Status = 'wait' | 'finish' | 'error'

type Statuses = {
  file: Status
  settings: Status
  processing: Status
  download: Status
}

const defaultStatus: Statuses = {
  file: 'wait',
  settings: 'wait',
  processing: 'wait',
  download: 'wait'
}

const StepComponent = () => {
  const [current, setCurrent] = useState(0)

  const [statues, setStatues] = useState<Statuses>(defaultStatus)

  const {
    processed,
    globalReset,
    CluiStore,
    FileStore,
    UserStore
  } = ComponentStore

  const { allFiles } = FileStore

  const { isSubmitted } = CluiStore

  const { isActiveUser, localUsageCounter } = UserStore

  const [displayable, setDisplay] = useState(isActiveUser)

  useEffect(() => {
    if (localUsageCounter && localUsageCounter >= 3) {
      setDisplay(isActiveUser)
    }
  }, [localUsageCounter, isActiveUser])

  useEffect(() => {
    if (allFiles.length > 0) {
      setStatues(cur => ({ ...cur, file: 'finish' }))
      setCurrent(1)
    }
  }, [allFiles])

  useEffect(() => {
    if (globalReset) {
      setStatues(defaultStatus)
      setCurrent(0)
    }
  }, [globalReset])

  useEffect(() => {
    if (isSubmitted) {
      setStatues(cur => ({ ...cur, settings: 'finish' }))
      setCurrent(2)
    }
  }, [isSubmitted])

  useEffect(() => {
    if (processed) {
      setStatues(cur => ({ ...cur, processing: 'finish', download: 'finish' }))
      setCurrent(3)
    }
  }, [processed])
  if (!displayable) {
    return (
      <div className="step-wrapper">
        <Steps current={current}>
          <Step
            title="Add File"
            icon={<FontAwesomeIcon icon={faFile} />}
            status={statues.file}
          />
          <Step
            title="Choose Settings"
            icon={<FontAwesomeIcon icon={faCogs} />}
            status={statues.settings}
          />
          <Step
            title="Processing"
            icon={<FontAwesomeIcon icon={faClock} />}
            status={statues.processing}
          />
          <Step
            title="Download"
            icon={<FontAwesomeIcon icon={faDownload} />}
            status={statues.download}
          />
        </Steps>
        {/* @ts-ignore Styled JSX */}
        <style jsx>
          {`
            .step-wrapper {
              color: inherit !important;
              padding-top: 2vh;
            }
            .rc-steps-item-title {
              color: inherit !important;
            }
            .rc-steps-item-finish .rc-steps-item-icon > .rc-steps-icon {
              color: #6c63ff;
            }
            .rc-steps-item-finish .rc-steps-item-tail::after {
              background-color: #6c63ff;
            }
            .rc-steps-item-finish .rc-steps-item-title::after {
              background-color: #6c63ff;
            }
          `}
        </style>
      </div>
    )
  } else {
    return null
  }
}
export default observer(StepComponent)
