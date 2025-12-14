import { useState, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Box, Button, TextInput, Text, Label } from '@okshaun/components';
import { Flex, HStack, VStack } from '@styled-system/jsx';
import { css } from '@styled-system/css';

const WORKER_URL = import.meta.env.PROD
  ? 'https://mockingbird-worker.shaunrfox.workers.dev'
  : 'http://localhost:8787';

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

interface NewsletterFormData {
  email: string;
  honeypot?: string;
  turnstileToken: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const hiddenStyle = css({
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 'none',
  padding: '0',
  margin: '0',
  width: '1',
  height: '1',
});

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>();

  const onSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${WORKER_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        reset();
        turnstileRef.current?.reset();
      } else {
        setStatus('error');
        setErrorMessage(
          result.message || 'Something went wrong. Please try again.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error. Please check your connection and try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <VStack gap='12'>
        <Text color='text'>Check your email to confirm your subscription!</Text>
        <Button appearance='hollow' onClick={() => setStatus('idle')}>
          Subscribe another email
        </Button>
      </VStack>
    );
  }

  return (
    <Box
      as='form'
      onSubmit={handleSubmit(onSubmit)}
      width={{ base: 'full', xs: 'fit' }}
    >
      <VStack gap='4' alignItems='stretch'>
        {/* Honeypot field - hidden from humans, bots will fill it */}
        <div className={hiddenStyle} aria-hidden='true'>
          <label htmlFor='nl-website'>Website</label>
          <input
            type='text'
            id='nl-website'
            autoComplete='off'
            tabIndex={-1}
            {...register('honeypot')}
          />
        </div>

        <Flex
          flexDir={{ base: 'column', xs: 'row' }}
          width={{ base: 'full', xs: 'fit' }}
          gap='8'
          alignItems='end'
          flexWrap='wrap'
        >
          <Flex
            flexDir='column'
            gap='4'
            width={{ base: 'full', xs: 'fit' }}
            minWidth='2xs'
          >
            <Label htmlFor='nl-email' textStyle='mono.md'>
              Newsletter sign-up
            </Label>
            <TextInput
              id='nl-email'
              type='email'
              placeholder='your@email.com'
              size='large'
              error={!!errors.email}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
          </Flex>
          <Button
            type='submit'
            appearance='primary'
            size='large'
            width={{ base: 'full', xs: 'fit' }}
            justifyContent='center'
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </Flex>

        {errors.email && (
          <Text size='14' color='text.danger'>
            {errors.email.message}
          </Text>
        )}

        <Box>
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={(token) => setValue('turnstileToken', token)}
            onError={() =>
              setErrorMessage('Verification failed. Please try again.')
            }
            options={{ size: 'invisible' }}
          />
        </Box>

        {status === 'error' && errorMessage && (
          <Text size='14' color='text.danger'>
            {errorMessage}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
