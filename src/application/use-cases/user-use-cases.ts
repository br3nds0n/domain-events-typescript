export class CreateUserProfileUseCase {
  async execute(name: string): Promise<void> {
    console.log(`👤 Creating profile for ${name}`);
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`✅ Profile created for ${name}`);
  }
}