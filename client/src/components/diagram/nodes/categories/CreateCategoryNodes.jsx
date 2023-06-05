import React from 'react';
import CategoryNode from './CategoryNode';

const CreateCategoryNodes = (categories) => {
  const categoryNodes = {};

  categories.forEach((category) => {
    const { categoryName, categoryBrief, surveys } = category;

    switch (categoryName) {
      case 'Content':
        categoryNodes.contentNode = function ContentNode() {
          return (
            <CategoryNode
              id="contentNode"
              categoryName="Content"
              topType="source"
              rightType="source"
              bottomType="target"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Audience':
        categoryNodes.audienceNode = function AudienceNode() {
          return (
            <CategoryNode
              id="audienceNode"
              categoryName="Audience"
              topType="source"
              rightType="source"
              bottomType="target"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Monetisation':
        categoryNodes.monetisationNode = function MonetisationNode() {
          return (
            <CategoryNode
              id="monetisationNode"
              categoryName="Monetisation"
              topType="source"
              rightType="source"
              bottomType="source"
              leftType="target"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Short-term Goals':
        categoryNodes.stgNode = function StgNode() {
          return (
            <CategoryNode
              id="stgNode"
              categoryName="Short-term Goals"
              topType="source"
              rightType="source"
              bottomType="target"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Long-term Goals':
        categoryNodes.ltgNode = function LtgNode() {
          return (
            <CategoryNode
              id="ltgNode"
              categoryName="Long-term Goals"
              topType="source"
              rightType="source"
              bottomType="target"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Skills Development':
        categoryNodes.skillsNode = function SkillsNode() {
          return (
            <CategoryNode
              id="skillsNode"
              categoryName="Skills Development"
              topType="source"
              rightType="target"
              bottomType="source"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Visual Identity':
        categoryNodes.visualIdentityNode = function VisualIdentityNode() {
          return (
            <CategoryNode
              id="visualIdentityNode"
              categoryName="Visual Identity"
              topType="source"
              rightType="target"
              bottomType="source"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Social Media Strategy':
        categoryNodes.socialMediaNode = function SocialMediaNode() {
          return (
            <CategoryNode
              id="socialMediaNode"
              categoryName="Social Media Strategy"
              topType="source"
              rightType="source"
              bottomType="source"
              leftType="target"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Networking and Industry Relations':
        categoryNodes.networkingNode = function NetworkingNode() {
          return (
            <CategoryNode
              id="networkingNode"
              categoryName="Networking and Industry Relations"
              topType="source"
              rightType="source"
              bottomType="source"
              leftType="target"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Legal and Ethical Considerations':
        categoryNodes.legalNode = function LegalNode() {
          return (
            <CategoryNode
              id="legalNode"
              categoryName="Legal and Ethical Considerations"
              topType="target"
              rightType="source"
              bottomType="source"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      case 'Analytics and Performance Tracking':
        categoryNodes.analyticsNode = function AnalyticsNode() {
          return (
            <CategoryNode
              id="analyticsNode"
              categoryName="Analytics and Performance Tracking"
              topType="source"
              rightType="target"
              bottomType="source"
              leftType="source"
              isConnectable="true"
              categoryBrief={categoryBrief}
              surveys={surveys}
            />
          );
        };
        break;
      default:
        break;
    }
  });
  return categoryNodes;
};

export default CreateCategoryNodes;
