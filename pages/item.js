import baseurl from '../utils/baseurl.js';
import view from '../utils/view.js';

export default async function Item() {
  let story = null;
  let hasComments = false;
  let hasError = false;

  try {
    const story = await getStory();
    const hasComments = story.comments.length > 6;
  } catch(error) {
    hasError = true;
    console.error(error);
  }

  if (hasError) {
    view.innerHTML = `<div class="error">Error fetching story</div>`;
  }
 
  view.innerHTML = `
    <div>
      ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : "No Comment"}
  `;
}

async function getStory() {
  const storyId = window.location.hash.split('?id=');
  const response = await fetch(`${baseurl}/items/${storyId}`);
  const story = await response.json();

  return story;
}
