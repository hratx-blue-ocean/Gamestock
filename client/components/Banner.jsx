import React from 'react';
import { Button } from './coreStyles.jsx';

export default function Banner() {
  return (
    <div>
      <div className="avatar">
        Avatar goes here
      </div>
      <div>
        Username
      </div>
      <div>
        Collection Size
      </div>
      <div>
        Collection Value
      </div>
      <Button>Button</Button>
      <Button primary >Button</Button>
    </div>
  )
}
