'use client';

import { authService } from '@/shared/api/auth-service';
import {
  Button,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormData {
  login: string;
  password: string;
  confirmPassword?: string;
}

interface FormErrors {
  login?: string;
  password?: string;
  confirmPassword?: string;
}

export const metadata: Metadata = {
  title: 'Auth',
};

export default function Auth() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.login) {
      newErrors.login = t('loginRequired');
    } else if (formData.login.length < 3) {
      newErrors.login = t('loginMinLength');
    }

    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 2) {
      newErrors.password = t('passwordMinLength');
    }

    if (isRegister) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('confirmPasswordRequired');
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordsDoNotMatch');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isRegister) {
        await authService.register(formData.login, formData.password);
        toast.success(t('registrationSuccess'));
      } else {
        await authService.login(formData.login, formData.password);
        toast.success(t('loginSuccess'));
      }
      router.push('/');
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(t('authError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {isRegister ? t('register') : t('login')}
        </h1>

        <Tabs
          onValueChange={(value) => {
            setIsRegister(value === 'register');
            setErrors({});
          }}
          defaultValue={isRegister ? 'register' : 'login'}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{t('login')}</TabsTrigger>
            <TabsTrigger value="register">{t('register')}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">{t('login')}</Label>
                <Input
                  id="login"
                  name="login"
                  type="text"
                  required
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder={t('loginPlaceholder')}
                  className={errors.login ? 'border-red-500' : ''}
                />
                {errors.login && (
                  <p className="text-sm text-red-500">{errors.login}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t('passwordPlaceholder')}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? t('loggingIn') : t('login')}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-login">{t('login')}</Label>
                <Input
                  id="register-login"
                  name="login"
                  type="email"
                  required
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder={t('loginPlaceholder')}
                  className={errors.login ? 'border-red-500' : ''}
                />
                {errors.login && (
                  <p className="text-sm text-red-500">{errors.login}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">{t('password')}</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t('passwordPlaceholder')}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={t('confirmPasswordPlaceholder')}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? t('registering') : t('register')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
