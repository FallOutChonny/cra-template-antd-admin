import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import env from '@utils/env'

type Props = {
  type?: number | string | 404
}

export default function Exception({ type = 404 }: Props) {
  return (
    <ExceptionWrapper>
      <div className="exception">
        <div className="exception__imgBlock">
          <div
            className="exception__imgEle"
            style={{
              backgroundImage: `url("${env.publicUrl}/img/${type}.svg")`,
            }}
          />
        </div>
        <div className="exception__content">
          <h1>404</h1>
          <div className="exception__desc">
            {type === 404
              ? 'Sorry, the page you visited does not exist.'
              : type === 500
              ? 'Sorry, the server is reporting an error.'
              : `Sorry, you don't have access to this page.`}
          </div>
          <div className="exception__actions">
            <Link to="/">
              <Button color="primary">Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </ExceptionWrapper>
  )
}

const ExceptionWrapper = styled.div`
  height: 100vh;
  margin-right: -24px;
  background: #fff;
  border-radius: 4px;

  .exception {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .exception .exception__imgBlock {
    flex: 0 0 57.5%;
    width: 57.5%;
    padding-right: 110px;
    zoom: 1;
  }

  .exception .exception__imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .exception .exception__content {
    flex: auto;
  }

  .exception .exception__content h1 {
    margin-bottom: 24px;
    color: #434e59;
    font-weight: 600;
    font-size: 72px;
    line-height: 72px;
  }

  .exception .exception__content .exception__desc {
    margin-bottom: 24px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
  }
`
