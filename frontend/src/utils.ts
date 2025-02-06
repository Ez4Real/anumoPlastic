import type { ApiError, ImageItem } from "./client"
import { TFunction } from "i18next"

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
}

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
}

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  }

  if (isRequired) {
    rules.required = "Password is required"
  }

  return rules
}

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true,
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password
      return value === password ? true : "The passwords do not match"
    },
  }

  if (isRequired) {
    rules.required = "Password confirmation is required"
  }

  return rules
}

export const handleError = (err: ApiError, showToast: any) => {
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Something went wrong."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  showToast("Error", errorMessage, "error")
}

export const customSmoothScroll = (targetPosition: number, duration: number): void => {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  const scrollStep = (timestamp: number, startTime: number = timestamp): void => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startPosition + distance * progress);

    if (progress < 1) {
      requestAnimationFrame((timestamp) => scrollStep(timestamp, startTime));
    }
  };

  requestAnimationFrame(scrollStep);
};

export const validateImage = (
  file: File,
  index: number,
  allowedFormats: string[],
  t: TFunction,
  maxSizeMB: number = 10
): { image: ImageItem | null; error: string | null } => {

  if (!allowedFormats.includes(file.type)) {
    return {
      image: null,
      error: t("AdminPanel.products.addProduct.fields.images.invalidFormatMsg"),
    };
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      image: null,
      error: t("AdminPanel.products.addProduct.fields.images.invalidFileSizeMsg", {
        size: maxSizeMB,
      }),
    };
  }

  return {
    image: {
      id: `${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
    },
    error: null,
  };
};