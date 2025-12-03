/**
 * Navigation Context Hook
 * Determines the current app mode (user/helper) and provides appropriate routes
 */

import { HELPER_ROUTES, USER_ROUTES } from "@/_util/navigationRoutes";
import { useHelper } from "@/contexts/HelperContext";
import { useUser } from "@/contexts/UserContext";
import { usePathname } from "expo-router";

export type AppMode = "user" | "helper";

export interface NavigationContext {
  mode: AppMode;
  routes: typeof USER_ROUTES | typeof HELPER_ROUTES;
  isLoading: boolean;
  isHelper: boolean;
  isUser: boolean;
}

/**
 * Hook to determine current navigation context based on logged-in user type
 *
 * @returns Navigation context with mode, routes, and loading state
 *
 * @example
 * ```typescript
 * const { mode, routes } = useNavigationContext();
 * router.push(routes.SETTINGS_PROFILE); // Automatically routes to /user or /helper
 * ```
 */
export function useNavigationContext(): NavigationContext {
  const pathname = usePathname();
  const { selectedHelperId, isLoading: isHelperLoading } = useHelper();
  const { selectedUserId, isLoading: isUserLoading } = useUser();

  // Determine mode based on current URL path
  // If the pathname starts with /helper, use helper mode; otherwise use user mode
  const isHelper = pathname.startsWith("/helper");
  const isUser = !isHelper;
  const mode: AppMode = isHelper ? "helper" : "user";

  // Select appropriate routes based on mode
  const routes = mode === "helper" ? HELPER_ROUTES : USER_ROUTES;

  return {
    mode,
    routes,
    isLoading: isHelperLoading || isUserLoading,
    isHelper,
    isUser,
  };
}
