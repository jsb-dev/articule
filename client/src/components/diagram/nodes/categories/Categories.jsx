import React from 'react';
import CategoryNode from './CategoryNode';

export function ContentNode() {
  return (
    <CategoryNode
      categoryName="Content"
      topType="source"
      rightType="source"
      bottomType="target"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function AudienceNode() {
  return (
    <CategoryNode
      categoryName="Audience"
      topType="source"
      rightType="source"
      bottomType="target"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function MonetisationNode() {
  return (
    <CategoryNode
      categoryName="Monetisation"
      topType="source"
      rightType="source"
      bottomType="source"
      leftType="target"
      isConnectable="true"
    />
  );
}

export function StgNode() {
  return (
    <CategoryNode
      categoryName="Short-term Goals"
      topType="source"
      rightType="source"
      bottomType="target"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function LtgNode() {
  return (
    <CategoryNode
      categoryName="Long-term Goals"
      topType="source"
      rightType="source"
      bottomType="target"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function SkillsNode() {
  return (
    <CategoryNode
      categoryName="Skills Development"
      topType="source"
      rightType="target"
      bottomType="source"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function VisualIdentityNode() {
  return (
    <CategoryNode
      categoryName="Visual Identity"
      topType="source"
      rightType="target"
      bottomType="source"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function SocialMediaNode() {
  return (
    <CategoryNode
      categoryName="Social Media Strategy"
      topType="source"
      rightType="source"
      bottomType="source"
      leftType="target"
      isConnectable="true"
    />
  );
}

export function NetworkingNode() {
  return (
    <CategoryNode
      categoryName="Networking and Industry Relations"
      topType="source"
      rightType="source"
      bottomType="source"
      leftType="target"
      isConnectable="true"
    />
  );
}

export function LegalNode() {
  return (
    <CategoryNode
      categoryName="Legal and Ethical Considerations"
      topType="target"
      rightType="source"
      bottomType="source"
      leftType="source"
      isConnectable="true"
    />
  );
}

export function AnalyticsNode() {
  return (
    <CategoryNode
      categoryName="Analytics and Performance Tracking"
      topType="source"
      rightType="target"
      bottomType="source"
      leftType="source"
      isConnectable="true"
    />
  );
}
