import React from 'react';
import CategoryNode from './CategoryNode';

export function ContentNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function AudienceNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function MonetisationNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function StgNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function LtgNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function SkillsNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function VisualIdentityNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function SocialMediaNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function NetworkingNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function LegalNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}

export function AnalyticsNode({ categoryBrief, surveys }) {
  return (
    <CategoryNode
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
}
