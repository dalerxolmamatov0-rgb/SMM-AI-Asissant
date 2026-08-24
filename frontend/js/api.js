/**
 * Centralized API Client with JWT Auth and Error Handling
 */

const API_BASE = "";

const API = {
  getToken() {
    return localStorage.getItem("smm_access_token") || "";
  },

  setToken(token) {
    localStorage.setItem("smm_access_token", token);
  },

  clearToken() {
    localStorage.removeItem("smm_access_token");
    localStorage.removeItem("smm_user_info");
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem("smm_user_info") || "null");
    } catch {
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem("smm_user_info", JSON.stringify(user));
  },

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.status === 401) {
        // Unauthorized
        this.clearToken();
        if (!options.silent && typeof showAuthModal === "function") {
          showAuthModal("login");
        }
        throw new Error("Iltimos, tizimga kiring.");
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = data?.detail || data?.message || "Serverda xatolik yuz berdi.";
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      if (!options.silent && typeof showToast === "function") {
        let msg = err.message;
        if (msg === "Failed to fetch" || msg.includes("fetch")) {
          msg = "Internet yoki server bilan aloqa yo'q.";
        }
        showToast(msg, "error");
      }
      throw err;
    }
  },

  // Auth endpoints
  register(userData) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    });
  },

  login(credentials) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },

  googleAuth(payload) {
    return this.request("/api/auth/google", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  logout() {
    return this.request("/api/auth/logout", {
      method: "POST",
      silent: true
    }).catch(() => null);
  },

  getMe(options = {}) {
    return this.request("/api/auth/me", { silent: true, ...options });
  },

  getUsage(options = {}) {
    return this.request("/api/auth/usage", { silent: true, ...options });
  },

  // Feedback endpoints
  submitFeedback(payload) {
    return this.request("/api/feedback", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  getMyFeedbacks() {
    return this.request("/api/feedback/my");
  },

  // Generator endpoints
  generatePost(payload) {
    return this.request("/api/generate/post", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  generateReels(payload) {
    return this.request("/api/generate/reels", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  generateContentPlan(payload) {
    return this.request("/api/generate/content-plan", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  generateHashtags(payload) {
    return this.request("/api/generate/hashtags", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  generateAdCopy(payload) {
    return this.request("/api/generate/ad-copy", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  generateImagePrompt(payload) {
    return this.request("/api/generate/image-prompt", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  generateAudience(payload) {
    return this.request("/api/generate/audience", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  // Business Profile
  getBusinessProfile() {
    return this.request("/api/business/profile");
  },

  saveBusinessProfile(payload) {
    return this.request("/api/business/profile", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  // History
  getHistory(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/history?${query}`);
  },

  deleteHistoryItem(id) {
    return this.request(`/api/history/${id}`, {
      method: "DELETE"
    });
  },

  // Chat
  sendChatMessage(message, contextBusiness = null) {
    return this.request("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, context_business: contextBusiness })
    });
  },

  getChatHistory() {
    return this.request("/api/chat/history");
  },

  clearChatHistory() {
    return this.request("/api/chat/clear", {
      method: "DELETE"
    });
  }
};

function getCurrentUser() {
  return API.getUser();
}

function getToken() {
  return API.getToken();
}
