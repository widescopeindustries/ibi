import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NewReviewNotificationProps {
  repName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  profileUrl: string;
}

export const NewReviewNotification = ({
  repName,
  reviewerName,
  rating,
  comment,
  profileUrl,
}: NewReviewNotificationProps) => {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '⭐' : '☆');
    }
    return stars.join('');
  };

  const ratingColor = rating >= 4 ? '#10B981' : rating >= 3 ? '#F59E0B' : '#EF4444';

  return (
    <Html>
      <Head />
      <Preview>You have a new {rating}-star review!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>New Review!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {repName},</Text>

            <Text style={paragraph}>
              Great news! You just received a new review on your IBI Directory profile.
            </Text>

            <Section style={reviewBox}>
              <Section style={ratingSection}>
                <Text style={ratingStars}>{renderStars(rating)}</Text>
                <Text style={{ ...ratingText, color: ratingColor }}>
                  {rating}.0 out of 5 stars
                </Text>
              </Section>

              <Hr style={reviewDivider} />

              <Text style={reviewLabel}>From:</Text>
              <Text style={reviewerText}>{reviewerName}</Text>

              {comment && (
                <>
                  <Text style={reviewLabel}>Comment:</Text>
                  <Text style={commentText}>"{comment}"</Text>
                </>
              )}
            </Section>

            {rating >= 4 ? (
              <Section style={congratsBox}>
                <Text style={congratsText}>
                  Awesome job! Positive reviews like this help boost your visibility and
                  attract more customers.
                </Text>
              </Section>
            ) : rating === 3 ? (
              <Section style={neutralBox}>
                <Text style={neutralText}>
                  This review provides valuable feedback. Consider reaching out to see how
                  you can improve the customer experience.
                </Text>
              </Section>
            ) : (
              <Section style={concernBox}>
                <Text style={concernText}>
                  We know negative reviews are tough. Use this as an opportunity to learn
                  and improve. Consider reaching out to address their concerns.
                </Text>
              </Section>
            )}

            <Section style={buttonContainer}>
              <Button style={button} href={profileUrl}>
                View Your Profile
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>Why reviews matter:</strong>
            </Text>

            <Section style={tipsBox}>
              <Text style={tipText}>
                • Profiles with 5+ reviews get 10x more customer inquiries
              </Text>
              <Text style={tipText}>
                • Higher ratings lead to better search placement
              </Text>
              <Text style={tipText}>
                • Reviews build trust with potential customers
              </Text>
            </Section>

            <Text style={paragraph}>
              Keep up the great work and continue providing excellent service to your
              customers!
            </Text>

            <Text style={footer}>
              Best regards,
              <br />
              The IBI Directory Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewReviewNotification;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 20px',
  backgroundColor: '#F59E0B',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#ffffff',
  textAlign: 'center' as const,
  margin: '0',
};

const content = {
  padding: '0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#1f2937',
};

const reviewBox = {
  backgroundColor: '#F9FAFB',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  padding: '32px',
  margin: '24px 0',
};

const ratingSection = {
  textAlign: 'center' as const,
  marginBottom: '16px',
};

const ratingStars = {
  fontSize: '32px',
  margin: '0 0 8px 0',
};

const ratingText = {
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const reviewDivider = {
  borderColor: '#E5E7EB',
  margin: '20px 0',
};

const reviewLabel = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#6B7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '16px 0 4px 0',
};

const reviewerText = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1F2937',
  margin: '0 0 16px 0',
};

const commentText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  fontStyle: 'italic',
  margin: '0',
  padding: '16px',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  borderLeft: '4px solid #F59E0B',
};

const congratsBox = {
  backgroundColor: '#D1FAE5',
  borderLeft: '4px solid #10B981',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '24px 0',
};

const congratsText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#065F46',
  margin: '0',
};

const neutralBox = {
  backgroundColor: '#FEF3C7',
  borderLeft: '4px solid #F59E0B',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '24px 0',
};

const neutralText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#92400E',
  margin: '0',
};

const concernBox = {
  backgroundColor: '#FEE2E2',
  borderLeft: '4px solid #EF4444',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '24px 0',
};

const concernText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#991B1B',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#F59E0B',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const tipsBox = {
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '16px 0',
};

const tipText = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#374151',
  margin: '4px 0',
};

const footer = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#6b7280',
  marginTop: '24px',
};
