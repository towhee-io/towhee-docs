import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import {useActiveVersion, useLatestVersion} from '@theme/hooks/useDocs';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);

export default function DocsVersionNavbarItem({
  label: staticLabel,
  to: staticTo,
  docsPluginId,
  ...props
}) {
  const activeVersion = useActiveVersion(docsPluginId);
  const {preferredVersion} = useDocsPreferredVersion(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const version = activeVersion ?? preferredVersion ?? latestVersion;
  const label = staticLabel ?? version.label;
  const path = staticTo ?? getVersionMainDoc(version).path;
  return <DefaultNavbarItem {...props} label={label} to={path} />;
}
