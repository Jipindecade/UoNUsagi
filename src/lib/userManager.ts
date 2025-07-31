// 用户管理系统
export interface UserData {
  userId: string;
  interactionCount: number;
  startDate: string;
  customCharacters: any[];
  unlockedStories: number[];
  createdAt: string;
}

export class UserManager {
  private static instance: UserManager;
  private currentUserId: string;

  private constructor() {
    this.currentUserId = this.initializeUser();
  }

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  private generateUserId(): string {
    // 生成基于设备和时间的唯一ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const userAgent = navigator.userAgent.slice(-10);
    return `user_${timestamp}_${random}_${btoa(userAgent).slice(0, 8)}`;
  }

  private initializeUser(): string {
    let userId = localStorage.getItem('usagi_user_id');
    
    if (!userId) {
      // 新用户，创建新的用户ID
      userId = this.generateUserId();
      localStorage.setItem('usagi_user_id', userId);
      
      // 初始化用户数据
      const userData: UserData = {
        userId,
        interactionCount: 0,
        startDate: new Date().toDateString(),
        customCharacters: [
          { name: "Yutong", emoji: "🐰", description: "Cute and friendly rabbit" },
          { name: "Yutong Fu", emoji: "🎭", description: "Playful performer" },
          { name: "World Peace", emoji: "🕊️", description: "Peaceful dove" },
          { name: "Nottingham", emoji: "🦌", description: "Noble deer" }
        ],
        unlockedStories: [],
        createdAt: new Date().toISOString()
      };
      
      this.saveUserData(userData);
    }
    
    return userId;
  }

  public getCurrentUserId(): string {
    return this.currentUserId;
  }

  public getUserData(): UserData {
    const data = localStorage.getItem(`usagi_data_${this.currentUserId}`);
    if (data) {
      return JSON.parse(data);
    }
    
    // 如果没有数据，返回默认数据
    return {
      userId: this.currentUserId,
      interactionCount: 0,
      startDate: new Date().toDateString(),
      customCharacters: [
        { name: "Yutong", emoji: "🐰", description: "Cute and friendly rabbit" },
        { name: "Yutong Fu", emoji: "🎭", description: "Playful performer" },
        { name: "World Peace", emoji: "🕊️", description: "Peaceful dove" },
        { name: "Nottingham", emoji: "🦌", description: "Noble deer" }
      ],
      unlockedStories: [],
      createdAt: new Date().toISOString()
    };
  }

  public saveUserData(userData: UserData): void {
    localStorage.setItem(`usagi_data_${this.currentUserId}`, JSON.stringify(userData));
  }

  public incrementInteraction(): number {
    const userData = this.getUserData();
    userData.interactionCount += 1;
    this.saveUserData(userData);
    return userData.interactionCount;
  }

  public getInteractionCount(): number {
    return this.getUserData().interactionCount;
  }

  public getDaysTogether(): number {
    const userData = this.getUserData();
    const startDate = new Date(userData.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  }

  public getIntimacyLevel(count?: number): { level: number; name: string } {
    const interactionCount = count || this.getInteractionCount();
    if (interactionCount >= 50) return { level: 5, name: "Best Friend" };
    if (interactionCount >= 30) return { level: 4, name: "Close Friend" };
    if (interactionCount >= 15) return { level: 3, name: "Good Friend" };
    if (interactionCount >= 5) return { level: 2, name: "Friend" };
    return { level: 1, name: "New Friend" };
  }

  // 创建新账户（用于测试或重置）
  public createNewAccount(): string {
    const newUserId = this.generateUserId();
    localStorage.setItem('usagi_user_id', newUserId);
    this.currentUserId = newUserId;
    
    const userData: UserData = {
      userId: newUserId,
      interactionCount: 0,
      startDate: new Date().toDateString(),
      customCharacters: [
        { name: "Yutong", emoji: "🐰", description: "Cute and friendly rabbit" },
        { name: "Yutong Fu", emoji: "🎭", description: "Playful performer" },
        { name: "World Peace", emoji: "🕊️", description: "Peaceful dove" },
        { name: "Nottingham", emoji: "🦌", description: "Noble deer" }
      ],
      unlockedStories: [],
      createdAt: new Date().toISOString()
    };
    
    this.saveUserData(userData);
    return newUserId;
  }

  // 获取用户统计信息（用于调试）
  public getUserStats(): { userId: string; daysTogether: number; interactionCount: number; intimacyLevel: any } {
    return {
      userId: this.currentUserId,
      daysTogether: this.getDaysTogether(),
      interactionCount: this.getInteractionCount(),
      intimacyLevel: this.getIntimacyLevel()
    };
  }
}