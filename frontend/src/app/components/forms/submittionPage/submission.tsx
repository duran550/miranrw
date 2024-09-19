import React from 'react'

interface SubmissionProps {
    children:any;
}

const SubmissionPage:React.FC<SubmissionProps> = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default SubmissionPage;