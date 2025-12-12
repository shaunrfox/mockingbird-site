import { useState, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import {
  Box,
  Button,
  TextInput,
  Textarea,
  Label,
  Text,
} from '@okshaun/components';
import { VStack, Flex } from '@styled-system/jsx';
import { css } from '@styled-system/css';

const WORKER_URL = import.meta.env.PROD
  ? 'https://mockingbird-worker.shaunrfox.workers.dev'
  : 'http://localhost:8787';

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
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

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${WORKER_URL}/contact`, {
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
      <Box p='24' bg='bg.success' borderRadius='8'>
        <Text size='24' fontWeight='medium' color='text.success'>
          Thanks for reaching out!
        </Text>
        <Text size='16' color='text.success' mt='8'>
          We've received your message and will get back to you soon.
        </Text>
        <Button variant='hollow' mt='16' onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap='16' alignItems='end'>
        {/* Honeypot field - hidden from humans, bots will fill it */}
        <div className={hiddenStyle} aria-hidden='true'>
          <label htmlFor='website'>Website</label>
          <input
            type='text'
            id='website'
            autoComplete='off'
            tabIndex={-1}
            {...register('honeypot')}
          />
        </div>

        <Flex flexDir='column' gap='4' w='full'>
          <Label
            htmlFor='name'
            required
            fontSize='16'
            fontFamily='sans'
            color='text'
          >
            Name
          </Label>
          <TextInput
            id='name'
            placeholder='Your name'
            error={!!errors.name}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <Text size='14' color='text.danger'>
              {errors.name.message}
            </Text>
          )}
        </Flex>

        <Flex flexDir='column' gap='4' w='full'>
          <Label
            htmlFor='email'
            required
            fontSize='16'
            fontFamily='sans'
            color='text'
          >
            Email
          </Label>
          <TextInput
            id='email'
            type='email'
            placeholder='your@email.com'
            error={!!errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <Text size='14' color='text.danger'>
              {errors.email.message}
            </Text>
          )}
        </Flex>

        <Flex flexDir='column' gap='4' w='full'>
          <Label
            htmlFor='message'
            required
            fontSize='16'
            fontFamily='sans'
            color='text'
          >
            Message
          </Label>
          <Textarea
            id='message'
            placeholder='How can we help?'
            rows={4}
            error={!!errors.message}
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && (
            <Text size='14' color='text.danger'>
              {errors.message.message}
            </Text>
          )}
        </Flex>

        <Button
          type='submit'
          appearance='primary'
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>

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
          {errors.turnstileToken && (
            <Text size='14' color='text.danger'>
              Please complete the verification
            </Text>
          )}
        </Box>

        {status === 'error' && errorMessage && (
          <Box p='16' bg='bg.error' borderRadius='8'>
            <Text size='14' color='text.danger'>
              {errorMessage}
            </Text>
          </Box>
        )}
      </VStack>
    </form>
  );
}
