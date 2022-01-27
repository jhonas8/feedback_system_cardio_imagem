import './Styles/css/styles.css'

export default function FeedbackButton(this: any) {
  
  const render = () => (
      <button className="FeedbackButton">
          Feedback
      </button>
  )

    return {
        render,
  };
}
