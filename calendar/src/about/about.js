import React, { Component } from 'react';
import './about.css';

class about extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div className="container">
        <p>
        <div class="file-content md wiki">
        <h2 data-sourcepos="1:1-1:15" dir="auto">
        <a id="user-content-instructions" class="anchor" href="#instructions" aria-hidden="true"></a>Instructions</h2>
        <p data-sourcepos="3:1-4:84" dir="auto">The goal of this exercise is to create a demo calendar application using React &amp; Redux. We strongly recommend create-react-app to make the bootstrapping of your application really easy.
        Please don't use a <code>calendar</code> library, we would like to see your own calendar logic.</p>
        <h3 data-sourcepos="7:1-7:12" dir="auto">
        <a id="user-content-the-task" class="anchor" href="#the-task" aria-hidden="true"></a>The Task</h3>
        <p data-sourcepos="9:1-9:151" dir="auto">You should start by rendering a single month view of a calendar for the current month – along with the lines of the <code>calendar</code> image in this project.</p>
        <h3 data-sourcepos="12:1-12:28" dir="auto">
        <a id="user-content-features-requirements" class="anchor" href="#features-requirements" aria-hidden="true"></a>Features &amp; Requirements:</h3>
        <ul data-sourcepos="14:1-21:0" dir="auto">
        <li data-sourcepos="14:1-14:85">Ability to add a new “reminder” (max 30 chars) for a user entered day and time.</li>
        <li data-sourcepos="15:1-15:67">Display reminders on the calendar view in the correct time order.</li>
        <li data-sourcepos="16:1-16:89">Allow the user to select a color when creating a reminder and display it appropriately.</li>
        <li data-sourcepos="17:1-17:75">Properly handle overflow when multiple reminders appear on the same date.</li>
        <li data-sourcepos="18:1-18:78">Ability to edit reminders – including changing text, day and time &amp; color.</li>
        <li data-sourcepos="19:1-19:30">Ability to delete reminders.</li>
        <li data-sourcepos="20:1-21:0">Expand the calendar to support more than the current month.</li>
        </ul>
        <h3 data-sourcepos="22:1-22:10" dir="auto">
        <a id="user-content-notes" class="anchor" href="#notes" aria-hidden="true"></a>Notes:</h3>
        <ul data-sourcepos="24:1-26:0" dir="auto">
        <li data-sourcepos="24:1-24:123">The data should be retained across different page views, but it’s not necessary to persist it beyond a browser refresh.</li>
        <li data-sourcepos="25:1-26:0">This is a coding activity and not a design activity. That’s not to say we don’t appreciate good design or that we don’t value those skills if you have them! It’s just that it won’t have a high value when scoring this particular project.</li>
        </ul>
        <h2 data-sourcepos="27:1-27:9" dir="auto">
        <a id="user-content-faq" class="anchor" href="#faq" aria-hidden="true"></a>F.A.Q.</h2>
        <h3 data-sourcepos="29:1-29:37" dir="auto">
        <a id="user-content-how-do-you-evaluate-the-exercise" class="anchor" href="#how-do-you-evaluate-the-exercise" aria-hidden="true"></a>How do you evaluate the exercise?</h3>
        <p data-sourcepos="30:1-30:169" dir="auto">Our evaluation is based on many aspects, such as general approach adopted, quality of code, use of best practices, capabilities to keep the code simple and maintainable.</p>
        <h3 data-sourcepos="32:1-32:35" dir="auto">
        <a id="user-content-how-can-i-deliver-the-exercise" class="anchor" href="#how-can-i-deliver-the-exercise" aria-hidden="true"></a>How can I deliver the exercise?</h3>
        <p data-sourcepos="33:1-33:164" dir="auto">To deliver the exercise, you should clone this repository and work on a new branch. When you'll consider it completed, just push the branch and open a Pull Request.</p>
        </div>
        </p>
      </div>
    );
  }
}

export default about;