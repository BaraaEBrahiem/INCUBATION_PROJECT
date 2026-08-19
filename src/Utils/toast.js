import toast from 'react-hot-toast';

const defaultOptions = {
  duration: 3000,
  position: 'top-center',
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
    padding: '15px 20px',
    fontSize: '20px',
    fontWeight: '600',
    direction: 'rtl',
  },
  success: {
    icon: '✔',
    style: {
      background: '#ffff',
      color: '#43A047',
      border: '1px solid #43A047',
    },
  },
  error: {
    icon: '❌',
    style: {
      background: '#ffff',
      color: '#E30909',
      border: '1px solid #E30909',
    },
  },
  loading: {
    style: {
      background: '#ffff',
      color: '#35557C',
      border: '1px solid #35557C',
    },
  },
};

// دالة نجاح
export const showSuccess = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...defaultOptions.success, ...options });
};

// دالة خطأ
export const showError = (error, options = {}) => {
  let message = "حدث خطأ غير متوقع.";

  if (typeof error === "string") {
    message = error;
  } else if (error?.data) {
    const data = error.data;

    if (data.detail) {
      message = data.detail;
    
    }
    else if (data.error) {
      message = data.error;
    }else if (data.message) {
      message = data.message;
    }
    else if (data.status) {
  message = data.status;
}
    else if (data.non_field_errors?.length) {
      message = data.non_field_errors[0];
    } else {
      const firstKey = Object.keys(data)[0];

      if (firstKey && Array.isArray(data[firstKey])) {
        message = data[firstKey][0];
      } else if (firstKey && typeof data[firstKey] === "string") {
        message = data[firstKey];
      }
    }
  } else if (error?.message) {
    message = error.message;
  }

  toast.error(message, {
    ...defaultOptions,
    ...defaultOptions.error,
    ...options,
  });
};

// دالة تحذير / معلومات
export const showInfo = (message, options = {}) => {
  toast(message, {
    ...defaultOptions,
    icon: 'ℹ️',
    style: { ...defaultOptions.style, background: '#3b82f6' },
    ...options,
  });
};

// دالة تحميل (للعمليات غير المتزامنة)
export const showLoading = (message, options = {}) => {
  return toast.loading(message, { ...defaultOptions, ...defaultOptions.loading, ...options });
};

// دالة promise (للعمليات غير المتزامنة مع رسائل نجاح/خطأ تلقائية)
export const showPromise = (promise, messages, options = {}) => {
  const { loading = 'جاري التنفيذ...', success = 'تم بنجاح!', error = 'حدث خطأ!' } = messages;
  return toast.promise(promise, {
    loading,
    success,
    error,
  }, { ...defaultOptions, ...options });
};