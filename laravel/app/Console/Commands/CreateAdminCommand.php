<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

/**
 * Create an admin user or reset an existing user's password and grant admin role.
 *
 *   php artisan admin:create bella@example.ru            # interactive password prompt
 *   php artisan admin:create bella@example.ru --generate # random password, printed once
 */
class CreateAdminCommand extends Command
{
    protected $signature = 'admin:create {email} {--name=Bella Hasias} {--generate : Generate a random password and print it}';

    protected $description = 'Create an admin user or reset password of an existing one';

    public function handle(): int
    {
        $email = Str::lower(trim($this->argument('email')));
        if (Validator::make(['email' => $email], ['email' => 'required|email'])->fails()) {
            $this->error('Invalid email');

            return self::FAILURE;
        }

        if ($this->option('generate')) {
            $password = Str::password(16, symbols: false);
        } else {
            $password = (string) $this->secret('Password (min 10 chars)');
            if (mb_strlen($password) < 10 || $password !== (string) $this->secret('Repeat password')) {
                $this->error('Password too short or does not match');

                return self::FAILURE;
            }
        }

        $user = User::firstOrNew(['email' => $email]);
        $existed = $user->exists;
        $user->name = $user->name ?: $this->option('name');
        $user->password = $password;
        $user->role = 'admin';
        $user->save();

        $this->info(($existed ? 'Password reset' : 'Admin created').": {$email}");
        if ($this->option('generate')) {
            $this->line("Password: {$password}");
            $this->warn('Save it now — it will not be shown again.');
        }

        return self::SUCCESS;
    }
}
