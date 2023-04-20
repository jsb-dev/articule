import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import env from 'react-dotenv';
import { useNavigate } from 'react-router-dom';

// Default V2 theme
// import 'survey-core/defaultV2.min.css';
// Modern theme
import 'survey-core/modern.min.css';

function IntroductionSurvey({ _id, userEmail }) {
  const { REACT_APP_API_URL } = env;
  const navigate = useNavigate();

  const surveyJson = {
    showCompletedPage: false,
    elements: [
      {
        name: 'artistName',
        title: 'Enter your name, artist alias or brand name here:',
        type: 'text',
      },
      {
        name: 'primaryContent',
        title:
          'Give a brief description of the main type of content you make (e.g. Cooking Tutorials, Fanfiction, etc.):',
        type: 'text',
      },
      {
        name: 'artistSummary',
        title:
          'How would you summarise your creative identity in 1-3 sentences?',
        type: 'text',
      },
    ],
  };

  const sendDataToServer = async (data) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}account/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const surveyComplete = useCallback(
    async (sender) => {
      const results = sender.data;

      const data = {
        _id,
        email: userEmail,
        diagram: {
          nodes: [
            {
              id: 'rootNode',
              type: 'rootNode',
              position: {
                x: 0,
                y: 0,
              },
              data: {
                artistName: results.artistName,
                primaryContent: results.primaryContent,
                artistSummary: results.artistSummary,
              },
            },
            {
              id: 'contentNode',
              type: 'contentNode',
              position: { x: 60, y: -310 },
              data: {
                categoryName: 'Content',
                categoryBrief:
                  'As a creative, your content is probably at the front of your mind when it comes to thinking about your brand. Here, we’ll closely analyse all the ways that your content can encapsulate the different aspects of your brand and personality. This will help you to develop content that’s more expressive, captivating, and diverse.',
              },
            },
            {
              id: 'audienceNode',
              type: 'audienceNode',
              position: { x: -150, y: -310 },
              data: {
                categoryName: 'Audience',
                categoryBrief:
                  'The audience is arguably the most important aspect of any creative brand. Here we will explore the fundamental characteristics you can develop to bring as much value as possible to your ideal audience. If there’s any category worth covering, it’s this one!',
              },
            },
            {
              id: 'monetisationNode',
              type: 'monetisationNode',
              position: { x: 480, y: -50 },
              data: {
                categoryName: 'Monetisation',
                categoryBrief:
                  'This area can seem like a touchy subject, but here we’ll explore why it really isn’t! As a creative brand, it’s essential to have a solid, sustainable strategy that allows you to do what you love for a living! You’ve got to eat too, right? Let’s take a closer look at how you can exchange value with your audience in a way that benefits everyone.',
              },
            },
            {
              id: 'stgNode',
              type: 'stgNode',
              position: { x: 230, y: -200 },
              data: {
                categoryName: 'Short-term Goals',
                categoryBrief:
                  'Goals are the catalysts of creative development. It’s essential to have desirable outcomes that are set in advance, which can be worked towards throughout the development of your brand. Here, we want to articulate what that looks like in the next 1-3 years. Remember, we can always review these as the brand develops.',
              },
            },
            {
              id: 'ltgNode',
              type: 'ltgNode',
              position: { x: -410, y: -200 },
              data: {
                categoryName: 'Long-term Goals',
                categoryBrief:
                  'As important as it is to consider things in the short term, it’s crucial to consider the direction of your brand in the long term. Here we will dive into your goals for the next 5-10 years. Think about ways that your short-term goals can serve your long-term goals, and how you can create new goals outside the topics covered in this platform.',
              },
            },
            {
              id: 'skillsNode',
              type: 'skillsNode',
              position: { x: -440, y: 280 },
              data: {
                categoryName: 'Skills Development',
                categoryBrief:
                  'The more you learn, the more you earn. As a developing brand, it’s essential to stay at the top of your game by constantly developing new and existing skills. Here we’ll explore some of the areas you can look at developing your skills in to consistently break new boundaries in your career.',
              },
            },
            {
              id: 'visualIdentityNode',
              type: 'visualIdentityNode',
              position: { x: -620, y: -40 },
              data: {
                categoryName: 'Visual Identity',
                categoryBrief:
                  'Visual appeal and congruency is everything in the domain of social media. It’s one thing to create great content, and it’s another to have content that is instantly identifiable as your own. Here we will explore the aspects to consider when developing the visual identity of your brand, so your digital appearance and presentation is always undeniably on-brand.',
              },
            },
            {
              id: 'socialMediaNode',
              type: 'socialMediaNode',
              position: { x: 230, y: 280 },
              data: {
                categoryName: 'Social Media Strategy',
                categoryBrief:
                  'What more needs to be said about the biggest stage in the world? Over the course of your brand development, you will spend an overwhelming amount of time considering how each step in your career will be communicated to the most effective degree. Here, we’ll articulate that as clearly as possible.',
              },
            },
            {
              id: 'networkingNode',
              type: 'networkingNode',
              position: { x: 350, y: 130 },
              data: {
                categoryName: 'Networking and Industry Relations',
                categoryBrief:
                  'Networking is an often-overlooked area of expertise in creative industries. The truth is, like in any industry, it’s not always about what you know, but who you know. In this section, we’ll look at developing strategies to not simply network in your chosen industry, but develop meaningful, lasting relationships to bolster your professional repertoire.',
              },
            },
            {
              id: 'legalNode',
              type: 'legalNode',
              position: { x: -180, y: 430 },
              data: {
                categoryName: 'Legal and Ethical Considerations',
                categoryBrief:
                  'While perhaps not the most exciting of areas to consider for most creative individuals, the unexpected obstacles faced through the creation and sharing of content over the internet can come back to bite us. Sometimes it will feel like a slap on the wrist, but other scenarios can hurt, extremely. Knowing the dos and don’ts is a must, there’s simply no debating. So, let’s look at developing your understanding to avoid any potential nightmares.',
              },
            },
            {
              id: 'analyticsNode',
              type: 'analyticsNode',
              position: { x: -750, y: 130 },
              data: {
                categoryName: 'Analytics and Performance Tracking',
                categoryBrief:
                  'What’s often missed in the early (and therefore most important) stages of creative careers is the fact that success can, and should, be measured. This isn’t just through achieving your goals, but also in numerical, mathematical observations. At the end of the day, it’s a game of numbers. If your numbers are high enough, you’ll have no problem making a living doing what you love.',
              },
            },
          ],
          edges: [
            {
              // edges
            },
          ],
        },
      };

      await sendDataToServer(data);

      navigate(`/dashboard?_id=${_id}`);
    },
    [userEmail, REACT_APP_API_URL, navigate]
  );

  const survey = new Model(surveyJson);
  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
}

export default IntroductionSurvey;
