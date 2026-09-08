import { useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import {
  Button,
  Label,
  Text,
  TextInput,
  Textarea,
} from '@okshaun/components';
import { VStack } from '@styled-system/jsx';
import { css } from '@styled-system/css';
import type { RegistrationField } from '~/lib/sanity';

const WORKER_URL = import.meta.env.PROD
  ? 'https://mockingbird-worker.shaunrfox.workers.dev'
  : 'http://localhost:8787';

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

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

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Answers = Record<string, string | boolean>;

/**
 * One form definition on the program, rendered for whichever date the
 * visitor is looking at. The event identity travels as an id, and the
 * Worker looks the event up itself — the browser never asserts what event
 * this is.
 */
export function RegistrationForm({
  eventId,
  fields,
}: {
  eventId: string;
  fields: RegistrationField[];
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const turnstileRef = useRef<TurnstileInstance>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Answers & { honeypot?: string; turnstileToken?: string }>();

  const onSubmit: SubmitHandler<Answers> = async (values) => {
    setStatus('submitting');
    setMessage('');
    const { honeypot, turnstileToken, ...answers } = values as Answers & {
      honeypot?: string;
      turnstileToken?: string;
    };
    try {
      const res = await fetch(`${WORKER_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, answers, honeypot, turnstileToken }),
      });
      const result = (await res.json()) as { success: boolean; message?: string };
      if (result.success) {
        setStatus('success');
        setMessage(result.message ?? "You're signed up.");
        reset();
      } else {
        setStatus('error');
        setMessage(result.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again.');
    } finally {
      turnstileRef.current?.reset();
    }
  };

  if (status === 'success') {
    return <Text>{message}</Text>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="stretch" gap="16">
        {fields.map((f) => {
          const rules = f.required ? { required: `${f.label} is required` } : {};
          const err = errors[f.name as keyof typeof errors];
          return (
            <VStack key={f._key} alignItems="stretch" gap="4">
              <Label htmlFor={f.name}>
                {f.label}
                {f.required ? ' *' : ''}
              </Label>

              {f.type === 'textarea' ? (
                <Textarea id={f.name} {...register(f.name, rules)} />
              ) : f.type === 'checkbox' ? (
                <input id={f.name} type="checkbox" {...register(f.name)} />
              ) : f.type === 'select' ? (
                <select id={f.name} {...register(f.name, rules)}>
                  <option value="">Choose one…</option>
                  {(f.options ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <TextInput
                  id={f.name}
                  type={f.type === 'email' ? 'email' : f.type === 'phone' ? 'tel' : 'text'}
                  {...register(f.name, rules)}
                />
              )}

              {err ? <Text>{String(err.message)}</Text> : null}
            </VStack>
          );
        })}

        {/* Bots fill this; people never see it. */}
        <div className={hiddenStyle} aria-hidden="true">
          <label htmlFor="reg-honeypot">Leave this empty</label>
          <input id="reg-honeypot" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
        </div>

        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={(token) => setValue('turnstileToken', token)}
        />

        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Sign up'}
        </Button>

        {status === 'error' ? <Text>{message}</Text> : null}
      </VStack>
    </form>
  );
}
