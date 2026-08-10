import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, KeyRound, Loader2, Mail } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { CrmInput } from '../../components/crm/CrmUI';
import { supabase } from '../../lib/supabase/browser';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      setHasRecoverySession(Boolean(session));
      setIsLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasRecoverySession(Boolean(session));
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSendRecovery = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/crm/reset-password`,
      });
      if (resetError) throw resetError;
      setMessage('If this email belongs to a CRM user, Supabase will send a recovery link.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send recovery email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setMessage('Password updated. Redirecting to CRM...');
      window.setTimeout(() => navigate('/crm'), 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="animate-spin text-white/20" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-[32px] border border-white/10 bg-[#0A0A0A] p-8 shadow-2xl md:p-12">
          <div className="mb-9 flex flex-col items-center">
            <Logo className="mb-6 h-12 w-auto" />
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-display font-bold uppercase tracking-tight text-white">
                {hasRecoverySession ? 'Set New Password' : 'Reset CRM Access'}
              </h1>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">
                {hasRecoverySession ? 'Recovery session active' : 'Password recovery'}
              </p>
            </div>
          </div>

          {hasRecoverySession ? (
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <CrmInput
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="pl-12"
                    required
                  />
                </div>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <CrmInput
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-center text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">{error}</p>}
              {message && <p className="text-center text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">{message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendRecovery} className="space-y-6">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <CrmInput
                  type="email"
                  placeholder="CRM Email Address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pl-12"
                  required
                />
              </div>

              {error && <p className="text-center text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">{error}</p>}
              {message && <p className="text-center text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">{message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {isSubmitting ? 'Sending...' : 'Send Recovery Email'}
              </button>
            </form>
          )}

          <Link
            to="/crm/login"
            className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-white/35 transition hover:text-white"
          >
            <ArrowLeft size={13} /> Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
